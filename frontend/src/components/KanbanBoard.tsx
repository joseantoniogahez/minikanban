import React from "react";
import { Card, ColumnState } from "../models/Card";
import ColumnComponent from "./ColumnComponent";

interface KanbanBoardProps {
  columns: ColumnState;
  draggingColumn: string | null;
  setDraggingColumn: (key: string | null) => void;
  handleDrop: (key: string) => void;
  handleDragStart: (card: Card) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  draggingColumn,
  setDraggingColumn,
  handleDrop,
  handleDragStart,
}) => (
  <div className="columns-3 gap-y-8 h-screen">
    {Object.entries(columns).map(([key, cards]) => {
      const columnProps = {
        to_do: { title: "TO DO", color: "stone" },
        in_progress: { title: "IN PROGRESS", color: "cyan" },
        done: { title: "DONE", color: "teal" },
      }[key] || { title: "UNKNOWN", color: "gray" };

      return (
        <ColumnComponent
          key={key}
          title={columnProps.title}
          cards={Object.values(cards)}
          color={columnProps.color}
          isHighlighted={draggingColumn === key}
          onDragEnter={() => setDraggingColumn(key)}
          onDragLeave={() => setDraggingColumn(null)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(key)}
          handleDragStart={handleDragStart}
        />
      );
    })}
  </div>
);

export default KanbanBoard;
