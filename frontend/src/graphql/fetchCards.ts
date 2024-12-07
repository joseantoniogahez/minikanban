import { gql } from "@apollo/client";
import { Card } from "../models/Card";
import { client } from "./apolloClient";

const fetchCards = async (): Promise<Card[]> => {
  const GET_CARDS_QUERY = gql`
    query GetCards {
      listCards {
        id
        title
        description
        status
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: GET_CARDS_QUERY,
    });

    return data.listCards;
  } catch (error) {
    throw new Error("Failed to fetch cards.");
  }
};

export default fetchCards;
