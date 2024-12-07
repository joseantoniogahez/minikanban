import { CARD_ENDPOINT } from "../constants";
import { Card, StatusEnum } from "../models/Card";

const updateCard = async (
  id: string,
  title: string,
  description: string,
  status: StatusEnum
): Promise<Card> => {
  const mutation = `
    mutation {
      updateCard(
        id: "${id}",
        title: "${title}",
        description: "${description}",
        status: ${status}
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

  const response = await fetch(CARD_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: mutation }),
  });

  const result = await response.json();

  if (result.errors) {
    console.log(result.errors);
    throw new Error("GraphQL Error");
  }

  console.log(result.data.updateCard.card);
  return result.data.updateCard.card;
};

export default updateCard;
