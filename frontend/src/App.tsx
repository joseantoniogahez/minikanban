import React, { useEffect, useState } from "react";
import CreateButton from "./components/CreateButton";
import KanbanBoard from "./components/KanbanBoard";
import Loader from "./components/Loader";
import SaveForm from "./components/SaveForm";
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
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

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

  const sendSaveCard = async (
    title: string,
    description: string,
    card: Card | null
  ) => {
    if (card) {
      try {
        setIsLoading(true);
        const updatedCard = await updateCard(
          card.id,
          title,
          description,
          card.status
        );
        setSelectedCard(null);
        setColumns((prevColumns) => {
          const column = updatedCard.status;
          const updatedTargetCards = { ...prevColumns[column] };
          updatedTargetCards[updatedCard.id] = updatedCard;

          return {
            ...prevColumns,
            [column]: updatedTargetCards,
          };
        });
      } catch (error) {
        console.error("Error updating card:", error);
      }
      setIsLoading(false);
    } else {
      sendCreateCard(title, description);
    }
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

  const sendUpdateCardStatus = async (targetColumn: StatusEnum) => {
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

  const handleDragStart = (card: Card) => {
    setDraggingCard(card);
  };

  useEffect(() => {
    updateColumns();
  }, []);

  return (
    <div>
      {isLoading && <Loader></Loader>}
      <KanbanBoard
        columns={columns}
        draggingColumn={draggingColumn}
        setDraggingColumn={setDraggingColumn}
        handleDrop={sendUpdateCardStatus}
        handleDragStart={handleDragStart}
        handleDeleteCard={sendDeleteCard}
        handleEditCard={setSelectedCard}
      ></KanbanBoard>
      <CreateButton handleClick={() => setShowCreateForm(true)}></CreateButton>
      {(showCreateForm || selectedCard) && (
        <SaveForm
          card={selectedCard}
          handleCloseForm={() => setShowCreateForm(false)}
          handleSaveCard={sendSaveCard}
        ></SaveForm>
      )}
    </div>
  );
};

export default App;
