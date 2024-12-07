import React from "react";
import { Card } from "../models/Card";
import CardComponent from "./CardComponent";

interface ColumnComponentProps {
  title: string;
  cards: Array<Card>;
  color: string;
  isHighlighted: boolean;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  handleDragStart: (card: Card) => void;
  handleDeleteCard: (card: Card) => void;
  handleEditCard: (card: Card) => void;
}

const ColumnComponent: React.FC<ColumnComponentProps> = ({
  title,
  cards,
  color,
  isHighlighted,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  handleDragStart,
  handleDeleteCard,
  handleEditCard,
}) => (
  <div
    className={`h-screen place-items-center transition-colors ${
      isHighlighted ? `bg-${color}-300` : `bg-${color}-100`
    }`}
    onDragEnter={onDragEnter}
    onDragLeave={onDragLeave}
    onDragOver={onDragOver}
    onDrop={onDrop}
  >
    <h1 className={`text-center font-bold text-${color}-700`}>{title}</h1>
    <div className="grid w-11/12 gap-y-2">
      {cards.map((card) => (
        <CardComponent
          key={card.id}
          card={card}
          onDragStart={() => handleDragStart(card)}
          onDelete={() => handleDeleteCard(card)}
          onEdit={() => handleEditCard(card)}
        />
      ))}
    </div>
  </div>
);

export default ColumnComponent;
