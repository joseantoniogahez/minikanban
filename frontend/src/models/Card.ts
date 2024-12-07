export interface Card {
  id: string;
  title: string;
  description: string;
  status: StatusEnum;
}

export type ColumnState = {
  [key in StatusEnum]: {
    [id: string]: Card;
  };
};

export enum StatusEnum {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
