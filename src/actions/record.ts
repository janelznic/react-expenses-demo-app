import { Action, ActionType, Record } from '../model/model';

export function addRecord(record: Record): Action<Record> {
  return {
    type: ActionType.ADD_RECORD,
    payload: record
  };
}

export function deleteRecord(recordId: number): Action<number> {
  return {
    type: ActionType.DELETE_RECORD,
    payload: recordId
  };
}
