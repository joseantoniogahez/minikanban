import uuid

from graphene import Enum, Field, List, Mutation, ObjectType, Schema, String

from app.database import create_card, delete_card, get_card_by_id, list_cards, update_card


class StatusEnum(Enum):
    TO_DO = "to_do"
    IN_PROGRESS = "in_progress"
    DONE = "done"


class CardType(ObjectType):
    id = String(required=True)
    title = String(required=True)
    description = String(required=True)
    status = StatusEnum(required=True)


class Query(ObjectType):
    get_card = Field(CardType, id=String(required=True))
    list_cards = List(CardType)

    def resolve_get_card(root, info, id):
        card = get_card_by_id(id)
        if card:
            return CardType(**card)
        raise Exception("Card doesn't exists")

    def resolve_list_cards(root, info):
        cards = list_cards()
        return [CardType(**card) for card in cards]


class CreateCard(Mutation):
    class Arguments:
        title = String(required=True)
        description = String(required=True)

    card = Field(CardType)

    def mutate(root, info, title, description):
        card_data = {
            "id": str(uuid.uuid4()),
            "title": title,
            "description": description,
            "status": StatusEnum.TO_DO.value,
        }
        new_card = create_card(card_data)
        if new_card:
            return CreateCard(card=CardType(**new_card))
        raise Exception("Failed to create card")


class UpdateCard(Mutation):
    class Arguments:
        id = String(required=True)
        title = String(required=True)
        description = String(required=True)
        status = StatusEnum(required=True)

    card = Field(CardType)

    def mutate(root, info, id, title, description, status):
        card_data = {
            "title": title,
            "description": description,
            "status": status.value,
        }
        updated_card = update_card(id, card_data)
        if updated_card:
            return UpdateCard(card=CardType(**updated_card))
        raise Exception("Failed to update card")


class DeleteCard(Mutation):
    class Arguments:
        id = String(required=True)

    success = String()

    def mutate(root, info, id):
        if delete_card(id):
            return DeleteCard(success="Card deleted successfully.")
        raise Exception("Failed to delete card")


class Mutation(ObjectType):
    create_card = CreateCard.Field()
    update_card = UpdateCard.Field()
    delete_card = DeleteCard.Field()


schema = Schema(query=Query, mutation=Mutation)
