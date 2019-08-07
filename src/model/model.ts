export interface Category {
  id: number;
  name: string;
}

export interface Record {
  id: number;
  categoryId: number;
  amount: number;
  text: string;
}

export enum ActionType {
  ADD_RECORD,
  DELETE_RECORD
}

export interface Action<T> {
  type: ActionType;
  payload: T;
}
