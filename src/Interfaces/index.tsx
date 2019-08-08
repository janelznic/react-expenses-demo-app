export interface Action<T> {
  type: ActionType;
  payload: T;
}

export enum ActionType {
  ADD_RECORD,
  DELETE_RECORD
}

export interface Category {
  id: number;
  name: string;
}

export interface Expenses {
  label: string;
  value: number;
}

export interface Record {
  id: number;
  categoryId: number;
  amount: number;
  text: string;
}
