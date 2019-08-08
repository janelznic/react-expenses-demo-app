import { Button, Grid, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RecordDialogComponent, RecordTableComponent } from '../Components';

interface Props extends RouteComponentProps<void> {}

export function AccountPage(props: Props) {
  const css = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddItem = () => {
    setOpen(true);
  };

  return (
    <Grid container className={css.root}>
      <RecordDialogComponent open={open} onClose={handleClose} />
      <Grid item xs={6}>
        <Typography variant="h4" gutterBottom>
          Expenses / Incomes
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <div className={css.buttonContainer}>
          <Button className={css.button} variant="contained" color="secondary" onClick={handleAddItem}>
            Add new record
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <RecordTableComponent />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 20,
    [theme.breakpoints.down('md')]: {
      paddingTop: 50,
      paddingLeft: 15,
      paddingRight: 15
    }
  },

  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  button: {
    marginBottom: 15
  }
}));
