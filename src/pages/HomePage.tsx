import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import HomeBox from '../components/HomeBox';
import { RootState } from '../reducers';
import { getBalance } from '../helpers/Helpers';

interface Props extends RouteComponentProps<void> {}

function HomePage(props: Props) {
  const css = useStyles();
  const [boxColor, setBoxColor] = React.useState('red');
  const recordList = useSelector((state: RootState) => state.recordList);
  const balance = getBalance(recordList);

  const onButtonClick = () => setBoxColor(boxColor === 'red' ? 'blue' : 'red');

  return (
    <div className={css.root}>
      <Typography variant="h6" gutterBottom>
        Your account balance is {balance} dollars.
      </Typography>

      <div className={css.centerContainer}>
        <HomeBox size={300} color={boxColor} />
        <Button className={css.button} onClick={onButtonClick} variant="outlined" color="primary">
          Change Color
        </Button>
      </div>
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

export default HomePage;
