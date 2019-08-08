import { Action, ActionType, Record } from '../Interfaces';
import createReducer from './createReducer';

export const recordList = createReducer<Record[]>([], {
  [ActionType.ADD_RECORD](state: Record[], action: Action<Record>) {
    return [...state, action.payload];
  },
  [ActionType.DELETE_RECORD](state: Record[], action: Action<number>) {
    return state.filter((rec) => rec.id !== action.payload);
  }
});
