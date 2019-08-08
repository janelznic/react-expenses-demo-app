// prettier-ignore
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as React from 'react';
import { useActions } from '../Actions';
import * as RecordActions from '../Actions/RecordActions';
import { categories } from '../consts';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function RecordDialogComponent(props: Props) {
  const css = useStyles();
  const { open, onClose } = props;
  const [newRecordCategory, setNewRecordCategory] = React.useState('');
  const [newRecordAmount, setNewRecordAmount] = React.useState(0);
  const [newRecordDescription, setNewRecordDescription] = React.useState('');
  const recordActions = useActions(RecordActions);

  const handleClosePopup = () => {
    onClose();
  };

  const handleAddRecord = () => {
    recordActions.addRecordAction({
      id: Math.random(),
      categoryId: newRecordCategory,
      amount: newRecordAmount,
      text: newRecordDescription
    });
    onClose();

    // reset values if user reopens the dialog
    setNewRecordAmount(0);
    setNewRecordDescription('');
    setNewRecordCategory('');
  };

  const handleChangeAmount = (event: any) => {
    setNewRecordAmount(parseInt(event.target.value));
  };

  const handleChangeCategory = (event: any) => {
    setNewRecordCategory(event.target.value);
  };

  const handleChangeDescription = (event: any) => {
    setNewRecordDescription(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClosePopup}>
      <DialogTitle className={css.dialogTitle}>Add a new record</DialogTitle>

      {onClose ? (
        <IconButton aria-label="close" className={css.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}

      <DialogContent>
        <FormControl className={css.fullwidth}>
          <InputLabel htmlFor="select-category">Category</InputLabel>
          <Select
            value={newRecordCategory}
            autoWidth={true}
            displayEmpty={true}
            onChange={(event) => handleChangeCategory(event)}
            input={<Input className={css.fullwidth}/>}
            id="select-category"
            aria-describedby="select-category"
          >
            {categories.map((name: string, index: number) => {
              return (
                <MenuItem value={index} key={index}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogContent>
        <FormControl className={css.fullwidth}>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            type="text"
            value={newRecordDescription}
            onChange={handleChangeDescription}
            id="description"
            aria-describedby="description"
          />
        </FormControl>
      </DialogContent>

      <DialogContent>
        <FormControl className={css.fullwidth}>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <Input
            type="number"
            value={newRecordAmount}
            onChange={handleChangeAmount}
            id="amount"
            aria-describedby="amount"
          />
        </FormControl>
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
  fullwidth: {
    width: '100%'
  },
  dialogTitle: {
    minWidth: '400px'
  },
  closeButton: {
    position: 'absolute',
    right: '.5rem',
    top: '.5rem',
    color: 'black',
  }
});
