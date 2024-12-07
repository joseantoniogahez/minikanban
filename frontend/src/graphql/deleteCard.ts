import { CARD_ENDPOINT } from "../constants";

const deleteCard = async (id: string): Promise<boolean> => {
  const mutation = `
    mutation {
      deleteCard(id: "${id}") { 
        success
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

  console.log(`Delete Success: ${result.data.deleteCard.success}`);
  return result.data.deleteCard.success;
};

export default deleteCard;
