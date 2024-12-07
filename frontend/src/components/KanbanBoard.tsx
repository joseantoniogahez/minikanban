import React from "react";
import { Card, ColumnState, StatusEnum } from "../models/Card";
import ColumnComponent from "./ColumnComponent";

interface KanbanBoardProps {
  columns: ColumnState;
  draggingColumn: string | null;
  setDraggingColumn: (key: StatusEnum | null) => void;
  handleDrop: (key: StatusEnum) => void;
  handleDragStart: (card: Card) => void;
  handleDeleteCard: (card: Card) => void;
  handleEditCard: (card: Card) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  draggingColumn,
  setDraggingColumn,
  handleDrop,
  handleDragStart,
  handleDeleteCard,
  handleEditCard,
}) => (
  <div className="columns-3 gap-y-8 h-screen">
    {Object.entries(columns).map(([key, cards]) => {
      const columnProps = {
        TO_DO: { title: "TO DO", color: "stone" },
        IN_PROGRESS: { title: "IN PROGRESS", color: "cyan" },
        DONE: { title: "DONE", color: "teal" },
      }[key] || { title: "UNKNOWN", color: "gray" };

      return (
        <ColumnComponent
          key={key}
          title={columnProps.title}
          cards={Object.values(cards)}
          color={columnProps.color}
          isHighlighted={draggingColumn === key}
          onDragEnter={() => setDraggingColumn(key as StatusEnum)}
          onDragLeave={() => setDraggingColumn(null)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(key as StatusEnum)}
          handleDragStart={handleDragStart}
          handleDeleteCard={handleDeleteCard}
          handleEditCard={handleEditCard}
        />
      );
    })}
  </div>
);

export default KanbanBoard;
