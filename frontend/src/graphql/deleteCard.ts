import { gql } from "@apollo/client";
import { client } from "./apolloClient";

const deleteCard = async (id: string): Promise<boolean> => {
  const DELETE_CARD_MUTATION = gql`
    mutation DeleteCard($id: String!) {
      deleteCard(id: $id) {
        success
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: DELETE_CARD_MUTATION,
      variables: { id },
    });

    return data.deleteCard.success;
  } catch (error) {
    throw new Error("Failed to delete card.");
  }
};

export default deleteCard;
