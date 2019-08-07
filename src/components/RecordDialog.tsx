// prettier-ignore
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as React from 'react';
import { useActions } from '../actions';
import * as RecordActions from '../actions/record';
import { categories } from '../consts/categories';
// import Dropdown from './Dropdown';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function RecordDialog(props: Props) {
  const { open, onClose } = props;
  const classes = useStyles();
  const [newRecordCategory, setNewRecordCategory] = React.useState('');
  const [newRecordAmount, setNewRecordAmount] = React.useState('');
  const [newRecordDescription, setNewRecordDescription] = React.useState('');
  const recordActions = useActions(RecordActions);

  const handleClosePopup = () => {
    onClose();
  };

  const handleAddRecord = () => {
    recordActions.addRecord({
      id: Math.random(),
      categoryId: newRecordCategory,
      amount: newRecordAmount,
      text: newRecordDescription
    });
    onClose();

    // reset values if user reopens the dialog
    setNewRecordAmount('');
    setNewRecordDescription('');
    setNewRecordCategory('');
  };

  const handleChangeAmount = (event: any) => {
    setNewRecordAmount(event.target.value);
  };

  const handleChangeCategory = (event: any) => {
    setNewRecordCategory(event.target.value);
  };

  const handleChangeDescription = (event: any) => {
    setNewRecordDescription(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClosePopup}>
      <DialogTitle>Add a new record</DialogTitle>

      <DialogContent>
        <Select
          value={newRecordCategory}
          onChange={event => handleChangeCategory(event)}
          input={<Input />}
        >
          {categories.map((name: string, index: number) => {
            return (<MenuItem value={index} key={index}>{name}</MenuItem>);
          })}
        </Select>
      </DialogContent>

      <DialogContent>
        <TextField
          placeholder='Description'
          value={newRecordDescription}
          onChange={handleChangeDescription}
        />
      </DialogContent>

      <DialogContent>
        <TextField
          placeholder='Amount'
          type='number'
          value={newRecordAmount}
          onChange={handleChangeAmount}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={handleAddRecord}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles({
  // textField: {
  //   width: '80%',
  //   margin: 20
  // }
});
