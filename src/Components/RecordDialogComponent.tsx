// prettier-ignore
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input } from "@material-ui/core";
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
      <DialogTitle>Add a new record</DialogTitle>

      <DialogContent>
        <Select value={newRecordCategory} onChange={(event) => handleChangeCategory(event)} input={<Input />}>
          {categories.map((name: string, index: number) => {
            return (
              <MenuItem value={index} key={index}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </DialogContent>

      <DialogContent>
        <Input placeholder="Description" type="text" value={newRecordDescription} onChange={handleChangeDescription} />
      </DialogContent>

      <DialogContent>
        <Input placeholder="Amount" type="number" value={newRecordAmount} onChange={handleChangeAmount} />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={handleAddRecord}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
