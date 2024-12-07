import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CARD_ENDPOINT } from "../constants";

export const client = new ApolloClient({
  uri: CARD_ENDPOINT,
  cache: new InMemoryCache(),
});
