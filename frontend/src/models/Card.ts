export interface Card {
    id: string;
    title: string;
    description: string;
    status: string;
  }

export type ColumnState = {
    [key: string]: {
      [id: string]: Card;
    };
  };