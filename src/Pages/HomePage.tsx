import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
// import HomeBox from '../components/HomeBox';
import { RootState } from '../Reducers';
import { calculateChart, getBalance } from '../Helpers/Helpers';
import { Expenses, Record } from '../Interfaces';
import { PieChartComponent } from '../Components/PieChartComponent';

interface Props extends RouteComponentProps<void> {}

export function HomePage(props: Props) {
  const css = useStyles();
  const recordList: Record[] = useSelector((state: RootState) => state.recordList);
  const balance = getBalance(recordList);
  const { expenses, incomes } = calculateChart(recordList);

  const expensesChart =
    <div>
      <Typography variant="h4" gutterBottom>
        Expenses
      </Typography>
      <PieChartComponent data={expenses} width={350} height={350} colors={['#e5c4aa', '#c08d74', '#ac6a4b']} />
    </div>;

  const incomesChart =
    <div>
      <Typography variant="h4" gutterBottom>
        Incomes
      </Typography>
      <PieChartComponent data={incomes} width={350} height={350} colors={['#bbd5b8', '#3aa7a9', '#45787e']} />
    </div>;

  return (
    <div className={css.root}>
      <Grid container className={css.root}>
        <Grid item xs={6}>
          {expensesChart}
        </Grid>
        <Grid item xs={6}>
          {incomesChart}
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Your account balance is {balance} dollars.
          </Typography>
        </Grid>
      </Grid>
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
