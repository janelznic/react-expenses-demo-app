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
      <PieChartComponent data={expenses} width={350} height={350} colors={['#825fc1', '#ce5fb1', '#f57193', '#f79774', '#f9c763', '#ac6a4b', '#b19ccf']} />
    </div>;

  const incomesChart =
    <div>
      <Typography variant="h4" gutterBottom>
        Incomes
      </Typography>
      <PieChartComponent data={incomes} width={350} height={350} colors={['#4ae075', '#00C492', '#00A59D', '#008595', '#00667D', '#2F4858', '#6b9a73']} />
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
