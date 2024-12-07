import { gql } from "@apollo/client";
import { Card } from "../models/Card";
import { client } from "./apolloClient";

const createCard = async (
  title: string,
  description: string
): Promise<Card> => {
  const CREATE_CARD_MUTATION = gql`
    mutation CreateCard($title: String!, $description: String!) {
      createCard(title: $title, description: $description) {
        card {
          id
          title
          description
          status
        }
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: CREATE_CARD_MUTATION,
      variables: { title, description },
    });

    return data.createCard.card;
  } catch (error) {
    throw new Error("Failed to create card.");
  }
};

export default createCard;
