from fastapi import FastAPI
from starlette_graphene3 import GraphQLApp, make_playground_handler

from app.schema import schema

# Initialize FastAPI app
app = FastAPI()

# Add GraphQL endpoint
app.add_route("/card", GraphQLApp(schema, on_get=make_playground_handler()))
