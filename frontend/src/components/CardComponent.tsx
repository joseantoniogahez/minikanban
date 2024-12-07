import React from "react";
import { Card } from "../models/Card";

interface CardComponentProps {
  card: Card;
  onDragStart: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  card,
  onDragStart,
  onDelete,
  onEdit,
}) => (
  <div
    draggable
    className="relative border rounded bg-white shadow cursor-grab transition-transform transform hover:scale-105"
    onDragStart={onDragStart}
  >
    <h2 className="border-b text-center font-semibold">{card.title}</h2>
    <p className="p-4 h-24">{card.description}</p>
    <button
      onClick={onEdit}
      className="absolute bottom-1 right-16 bg-blue-300 text-white text-sm px-3 py-1 rounded hover:bg-blue-400 focus:outline-none transition-transform transform hover:scale-105 cursor-pointer"
    >
      Edit
    </button>
    <button
      onClick={onDelete}
      className="absolute bottom-1 right-1 bg-red-300 text-white text-sm px-3 py-1 rounded hover:bg-red-400 focus:outline-none transition-transform transform hover:scale-105 cursor-pointer"
    >
      Del
    </button>
  </div>
);

export default CardComponent;
