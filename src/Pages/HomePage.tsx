import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
// import HomeBox from '../components/HomeBox';
import { RootState } from '../Reducers';
import { calculateExpenses, getBalance } from '../Helpers/Helpers';
import { Expenses, Record } from '../Interfaces';
import { PieChartComponent } from '../Components/PieChartComponent';

interface Props extends RouteComponentProps<void> {}

export function HomePage(props: Props) {
  const css = useStyles();
  const recordList: Record[] = useSelector((state: RootState) => state.recordList);
  const balance = getBalance(recordList);
  // const expenses = calculateExpenses(recordList);

  const chartData: Expenses[] = [
    { label: 'Food', value: 30 },
    { label: 'Wear', value: 50 },
    { label: 'Other', value: 20 }
  ];

  return (
    <div className={css.root}>
      <Typography variant='h6' gutterBottom>
        Your account balance is {balance} dollars.
      </Typography>

      <PieChartComponent data={chartData} width={400} height={400} colors={['#98abc5', '#8a89a6', '#7b6888']} />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    textAlign: 'center',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15
  },

  centerContainer: {
    flex: 1,
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  button: {
    marginTop: 20
  }
});
