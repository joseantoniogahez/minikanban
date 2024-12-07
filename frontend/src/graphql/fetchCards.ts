import { CARD_ENDPOINT } from "../constants";
import { Card } from "../models/Card";

const fetchCards = async (): Promise<Card[]> => {
  const query = `
    query GetCards {
      listCards {
        id
        title
        description
        status
      }
    }
  `;

  const response = await fetch(CARD_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error("GraphQL Error");
  }
  console.log(result.data.listCards);
  return result.data.listCards;
};

export default fetchCards;
