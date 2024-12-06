import uuid

import boto3
from botocore.exceptions import ClientError
from mypy_boto3_dynamodb.client import DynamoDBClient
from mypy_boto3_dynamodb.service_resource import DynamoDBServiceResource, Table

from app.constants import (
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    DYNAMODB_LOCAL_ENDPOINT,
    DYNAMODB_REGION,
    DYNAMODB_TABLE_NAME,
)


def get_dynamodb_resource() -> DynamoDBServiceResource:
    return boto3.resource(
        "dynamodb",
        region_name=DYNAMODB_REGION,
        endpoint_url=DYNAMODB_LOCAL_ENDPOINT,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )


def ensure_table_exists(dynamodb: DynamoDBServiceResource) -> Table:
    client: DynamoDBClient = boto3.client(
        "dynamodb",
        region_name=DYNAMODB_REGION,
        endpoint_url=DYNAMODB_LOCAL_ENDPOINT,
        aws_access_key_id="admin",
        aws_secret_access_key="admin123",
    )
    existing_tables = client.list_tables()["TableNames"]
    if DYNAMODB_TABLE_NAME in existing_tables:
        return dynamodb.Table(DYNAMODB_TABLE_NAME)

    try:
        table = dynamodb.create_table(
            TableName=DYNAMODB_TABLE_NAME,
            KeySchema=[{"AttributeName": "id", "KeyType": "HASH"}],
            AttributeDefinitions=[{"AttributeName": "id", "AttributeType": "S"}],
            ProvisionedThroughput={"ReadCapacityUnits": 5, "WriteCapacityUnits": 5},
        )
        table.wait_until_exists()
        return table
    except ClientError as e:
        raise Exception(f"Error creating table {DYNAMODB_TABLE_NAME}: {e}")


dynamodb = get_dynamodb_resource()
table = ensure_table_exists(dynamodb)


def get_card_by_id(id: str):
    try:
        response = table.get_item(Key={"id": id})
        return response.get("Item")
    except ClientError as e:
        raise Exception(f"Error fetching card {id}: {e}")


def list_cards():
    try:
        response = table.scan()
        return response.get("Items", [])
    except ClientError as e:
        raise Exception(f"Error listing cards: {e}")


def create_card(data: dict):
    try:
        data["id"] = data.get("id", str(uuid.uuid4()))
        table.put_item(Item=data)
        return data
    except ClientError as e:
        raise Exception(f"Error creating card {data}: {e}")


def update_card(id: str, data: dict):
    try:
        response = table.update_item(
            Key={"id": id},
            UpdateExpression="SET title = :t, description = :d, #s = :s",
            ExpressionAttributeNames={"#s": "status"},
            ExpressionAttributeValues={
                ":t": data["title"],
                ":d": data["description"],
                ":s": data["status"],
            },
            ReturnValues="ALL_NEW",
        )
        return response.get("Attributes")
    except ClientError as e:
        raise Exception(f"Error updating card {id=} {data=}, : {e}")


def delete_card(id: str):
    try:
        table.delete_item(Key={"id": id})
        return True
    except ClientError as e:
        raise Exception(f"Error deleting card {id}: {e}")
