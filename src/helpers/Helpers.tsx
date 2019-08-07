import { Record } from '../model/model';

export const getBalance = (recordList: Record[]) => {
  return recordList.reduce((previous, current) => {
    return previous + current.amount;
  }, 0);
};
