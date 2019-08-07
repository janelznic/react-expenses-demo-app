import { History } from 'history';
import { combineReducers } from 'redux';
import { Record } from '../model/model';
import * as recordReducer from './record';

export interface RootState {
  recordList: Record[];
}

export default (history: History) =>
  combineReducers({
    ...recordReducer
  });
