import { gql } from "@apollo/client";
import { Card, StatusEnum } from "../models/Card";
import { client } from "./apolloClient";

const updateCard = async (
  id: string,
  title: string,
  description: string,
  status: StatusEnum
): Promise<Card> => {
  const UPDATE_CARD_MUTATION = gql`
    mutation UpdateCard(
      $id: String!
      $title: String!
      $description: String!
      $status: StatusEnum!
    ) {
      updateCard(
        id: $id
        title: $title
        description: $description
        status: $status
      ) {
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
      mutation: UPDATE_CARD_MUTATION,
      variables: {
        id,
        title,
        description,
        status,
      },
    });

    return data.updateCard.card;
  } catch (error) {
    throw new Error("Failed to update card.");
  }
};

export default updateCard;
