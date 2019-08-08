import { Record } from '../Interfaces';
import { categories } from '../consts';

export const getBalance = (recordList: Record[]) => {
  return recordList.reduce((previous, current) => {
    return previous + current.amount;
  }, 0);
};

export const calculateChart = (recordList: Record[]) => {
  const createEmptyCategory = () => {
    let summary: any = [];

    categories.forEach((category, index) => summary.push({
      categoryId: index,
      label: category,
      value: 0
    }));

    return summary;
  };

  let expenses = createEmptyCategory();
  let incomes = createEmptyCategory();

  recordList.forEach(record => {
    if (record.amount < 0) {
      expenses[record.categoryId].value += (record.amount * -1);
    } else {
      incomes[record.categoryId].value += (record.amount);
    }
  });

  return { expenses, incomes };
};
