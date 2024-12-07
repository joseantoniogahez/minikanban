import { CARD_ENDPOINT } from "../constants";
import { Card } from "../models/Card";

const createCard = async (
  title: string,
  description: string
): Promise<Card> => {
  const mutation = `
      mutation {
        createCard(title: "${title}", description: "${description}") { 
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
    throw new Error("GraphQL Error");
  }

  console.log(result.data.createCard.card);
  return result.data.createCard.card;
};

export default createCard;
