import { Action, ActionType, Record } from '../Interfaces';

export function addRecordAction(record: Record): Action<Record> {
  return {
    type: ActionType.ADD_RECORD,
    payload: record
  };
}

export function deleteRecordAction(recordId: number): Action<number> {
  return {
    type: ActionType.DELETE_RECORD,
    payload: recordId
  };
}
