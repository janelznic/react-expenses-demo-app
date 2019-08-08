import { Record } from '../Interfaces';

export const getBalance = (recordList: Record[]) => {
  return recordList.reduce((previous, current) => {
    return previous + current.amount;
  }, 0);
};

export const calculateExpenses = (recordList: Record[]) => {
  let expenses = [];
  return recordList.forEach(record => {
    if (record.amount < 0) {
      expenses.push(record.amount * -1);
    }
  });
};
