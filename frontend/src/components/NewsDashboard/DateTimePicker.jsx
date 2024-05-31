import * as React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';


const ScheduleDialog = ({ open, selectedDate, onDateChange, onCancel, onSubmit }) => (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Schedule Article</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label="Schedule Date & Time"
                value={selectedDate}
                onChange={onDateChange}
                renderInput={(props) => <TextField {...props} />}
            />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
            Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
            Schedule
        </Button>
        </DialogActions>
    </Dialog>
);

export default ScheduleDialog;