import React from "react";
import { Card } from "../models/Card";

interface CardComponentProps {
  card: Card;
  onDragStart: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ card, onDragStart }) => (
  <div
    draggable
    className="border rounded bg-white shadow cursor-move transition-transform transform hover:scale-105"
    onDragStart={onDragStart}
  >
    <h2 className="border-b text-center font-semibold">{card.title}</h2>
    <p className="p-4 h-24">{card.description}</p>
  </div>
);

export default CardComponent;
