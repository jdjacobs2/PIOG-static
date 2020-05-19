import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: 'gray'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  textField: {
    color: 'gray'
  }
}));

function Intention(props) {

  const classes = useStyles();

  return (
    <Fragment>
      <Button variant='outlined' color='primary' onClick={props.clickOpen}>
        Open form dialog
      </Button>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle id='form-dialog-title'>DONATE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To donate please fill out this form and the next. Only Stripe,
            PIOG's billing service, will see or retain any personal information.
          </DialogContentText>
          {/* <TextField
              autoFocus
              margin='dense'
              id='email'
              label='Email Address'
              type='email'
              fullWidth
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Name'
              type='text'
              fullWidth
            /> */}
          <br />
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Duration</FormLabel>
            <RadioGroup
              row
              aria-label='Donation Duration'
              name='duration'
              value={props.dur}
              onChange={props.duration}
            >
              <FormControlLabel
                value='one-time'
                control={<Radio />}
                label='One Time Donatioon'
              />
              <FormControlLabel
                value='recurring'
                control={<Radio />}
                label='Recurring Donation'
              />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Currency</FormLabel>
            <RadioGroup
              row
              aria-label='Currency'
              name='currency'
              value={props.cur}
              onChange={props.currency}
            >
              <FormControlLabel
                value='US Dollar'
                control={<Radio />}
                label='US Dollar'
              />
              <FormControlLabel
                value='Canadian Dollar'
                control={<Radio />}
                label='Canadian Dollar'
              />
              <FormControlLabel
                value='Euro'
                control={<Radio />} l
                label='Euro' />
              <FormControlLabel
                value='Pound'
                control={<Radio />}
                label='British Pound'
              />
            </RadioGroup>
          </FormControl>
          <TextField
            autoFocus
            onChange={props.amount}
            value={props.amt}
            margin='dense'
            id='amount'
            variant='outlined'
            required
            label='Amount'
            type='number'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => props.close(e, 'cancel')} color='primary'>
            Cancel
          </Button>
          <Button onClick={(e) => props.close(e, 'donate')} color='primary'>
            Donate
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default Intention;
