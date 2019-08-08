import { History } from 'history';
import { combineReducers } from 'redux';
import { Record } from '../Interfaces';
import * as recordReducer from './RecordReducer';

export interface RootState {
  recordList: Record[];
}

export default (history: History) =>
  combineReducers({
    ...recordReducer
  });
