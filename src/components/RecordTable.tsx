// prettier-ignore
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../actions';
import * as RecordActions from '../actions/record';
import { Record } from '../model/model';
import { RootState } from '../reducers';
import { categories } from '../consts/categories';

interface Props {}

export function RecordTable(props: Props) {
  const classes = useStyles();
  const recordList = useSelector((state: RootState) => state.recordList);
  const recordActions = useActions(RecordActions);

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Description</TableCell>
            <TableCell padding="default">Amount</TableCell>
            <TableCell padding="default">Category</TableCell>
            <TableCell padding="default">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recordList.map((record: Record) => {
            return (
              <TableRow key={record.id} hover>
                <TableCell>{record.text}</TableCell>
                <TableCell>{record.amount}</TableCell>
                <TableCell>{categories[record.categoryId]}</TableCell>
                <TableCell padding="none">
                  <IconButton aria-label="Delete" color="default" onClick={() => recordActions.deleteRecord(record.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

const useStyles = makeStyles({
  paper: {
    width: '100%',
    minWidth: 260,
    display: 'inline-block'
  },
  table: {
    width: '100%'
  }
});
