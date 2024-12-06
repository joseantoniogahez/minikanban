from os import environ

DYNAMODB_REGION = "us-east-1"
DYNAMODB_TABLE_NAME = "Cards"
DYNAMODB_LOCAL_ENDPOINT = "http://dynamodb:8000"
AWS_ACCESS_KEY_ID = environ["AWS_ACCESS_KEY_ID"]
AWS_SECRET_ACCESS_KEY = environ["AWS_SECRET_ACCESS_KEY"]
