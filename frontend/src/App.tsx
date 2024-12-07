import React, { useEffect, useState } from "react";
import CreateButton from "./components/CreateButton";
import CreateForm from "./components/CreateForm";
import KanbanBoard from "./components/KanbanBoard";
import Loader from "./components/Loader";
import createCard from "./graphql/createCard";
import deleteCard from "./graphql/deleteCard";
import fetchCards from "./graphql/fetchCards";
import updateCard from "./graphql/updateCard";
import { Card, ColumnState, StatusEnum } from "./models/Card";

const App: React.FC = () => {
  const [columns, setColumns] = useState<ColumnState>({
    TO_DO: {},
    IN_PROGRESS: {},
    DONE: {},
  });
  const [draggingColumn, setDraggingColumn] = useState<string | null>(null);
  const [draggingCard, setDraggingCard] = useState<Card | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateColumns = async () => {
    try {
      setIsLoading(true);
      const cards = await fetchCards();

      const newColumns: ColumnState = {
        TO_DO: {},
        IN_PROGRESS: {},
        DONE: {},
      };

      cards.forEach((card) => {
        const columnKey = card.status;
        newColumns[columnKey][card.id] = card;
      });

      setColumns(newColumns);
    } catch (error) {
      console.error("Error updating columns:", error);
    }
    setIsLoading(false);
  };

  const sendCreateCard = async (title: string, description: string) => {
    try {
      setIsLoading(true);
      const newCard = await createCard(title, description);
      setColumns((prevColumns) => {
        return addCardToColumn(prevColumns, newCard);
      });
    } catch (error) {
      console.error("Error creating card:", error);
    }
    setIsLoading(false);
  };

  const sendDeleteCard = async (card: Card) => {
    try {
      setIsLoading(true);
      await deleteCard(card.id);
      setColumns((prevColumns) => {
        return removeCardFromColumn(prevColumns, card.id, card.status);
      });
    } catch (error) {
      console.error("Error deleting card:", error);
    }
    setIsLoading(false);
  };

  const sendUpdateCard = async (targetColumn: StatusEnum) => {
    if (draggingCard && draggingCard.status != targetColumn) {
      try {
        setIsLoading(true);
        const sourceColumn = draggingCard.status;
        const updatedCard = await updateCard(
          draggingCard.id,
          draggingCard.title,
          draggingCard.description,
          targetColumn
        );
        setColumns((prevColumns) => {
          return moveCardBetweenColumns(prevColumns, sourceColumn, updatedCard);
        });

        setDraggingCard(null);
        setDraggingColumn(null);
      } catch (error) {
        console.error("Error deleting card:", error);
      }
      setIsLoading(false);
    }
  };

  const addCardToColumn = (columns: ColumnState, card: Card) => {
    const targetColumn = card.status;
    const updatedTargetCards = { ...columns[targetColumn] };

    updatedTargetCards[card.id] = card;

    return {
      ...columns,
      [targetColumn]: updatedTargetCards,
    };
  };

  const removeCardFromColumn = (
    columns: ColumnState,
    cardId: string,
    sourceColumn: StatusEnum
  ) => {
    const updatedSourceCards = { ...columns[sourceColumn] };

    delete updatedSourceCards[cardId];

    return {
      ...columns,
      [sourceColumn]: updatedSourceCards,
    };
  };

  const moveCardBetweenColumns = (
    prevColumns: ColumnState,
    sourceColumn: StatusEnum,
    card: Card
  ) => {
    return addCardToColumn(
      removeCardFromColumn(prevColumns, card.id, sourceColumn),
      card
    );
  };

  useEffect(() => {
    updateColumns();
  }, []);

  const handleDragStart = (card: Card) => {
    setDraggingCard(card);
  };

  return (
    <div>
      {isLoading && <Loader></Loader>}
      <KanbanBoard
        columns={columns}
        draggingColumn={draggingColumn}
        setDraggingColumn={setDraggingColumn}
        handleDrop={sendUpdateCard}
        handleDragStart={handleDragStart}
        handleDeleteCard={sendDeleteCard}
      ></KanbanBoard>
      <CreateButton handleClick={() => setShowCreateForm(true)}></CreateButton>
      {showCreateForm && (
        <CreateForm
          handleCloseForm={() => setShowCreateForm(false)}
          handleCreateCard={sendCreateCard}
        ></CreateForm>
      )}
    </div>
  );
};

export default App;
