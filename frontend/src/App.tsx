import React, { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import { Card, ColumnState } from "./models/Card";
import { fetchCards } from "./models/fetchCards";

const App: React.FC = () => {
  const [columns, setColumns] = useState<ColumnState>({
    to_do: {},
    in_progress: {},
    done: {},
  });
  const [draggingColumn, setDraggingColumn] = useState<string | null>(null);
  const [draggingCard, setDraggingCard] = useState<Card | null>(null);

  const updateColumns = async () => {
    try {
      const cards = await fetchCards();

      const newColumns: ColumnState = {
        to_do: {},
        in_progress: {},
        done: {},
      };

      cards.forEach((card) => {
        const columnKey = card.status.toLowerCase();
        newColumns[columnKey][card.id] = card;
      });

      setColumns(newColumns);
    } catch (error) {
      console.error("Error updating columns:", error);
    }
  };

  useEffect(() => {
    updateColumns();
  }, []);

  const handleDragStart = (card: Card) => {
    setDraggingCard(card);
  };

  const handleDrop = (columnStatus: string) => {
    if (draggingCard) {
      setColumns((prevColumns) => {
        const sourceColumn = draggingCard.status.toLowerCase();
        const targetColumn = columnStatus;
        console.log(sourceColumn, targetColumn);

        const updatedSourceCards = { ...prevColumns[sourceColumn] };
        const updatedTargetCards = { ...prevColumns[targetColumn] };

        delete updatedSourceCards[draggingCard.id];

        updatedTargetCards[draggingCard.id] = {
          ...draggingCard,
          status: targetColumn,
        };

        return {
          ...prevColumns,
          [sourceColumn]: updatedSourceCards,
          [targetColumn]: updatedTargetCards,
        };
      });

      setDraggingCard(null);
      setDraggingColumn(null);
    }
  };

  return (
    <div>
      <KanbanBoard
        columns={columns}
        draggingColumn={draggingColumn}
        setDraggingColumn={setDraggingColumn}
        handleDrop={handleDrop}
        handleDragStart={handleDragStart}
      ></KanbanBoard>
    </div>
  );
};

export default App;
