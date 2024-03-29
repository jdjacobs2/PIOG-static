import React from 'react';
import {
  Grid,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
// import StripeElementWrapperF from './StripeElementWrapperF';
import StripeInputF from './StripeInputF';
// import handleSubmit from './StripeHandleOrder';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';

const useStyles = makeStyles(theme => ({
  root: {

    '& .MuiTextField-root': {
      margin: theme.spacing(4),
      width: '25ch',
      marginBottom: '20px'
      // },
      // '& > .MuiDialog-container > .MuiPaper-root': {
      //   minHeight: '380px'
      // },
      // // '& .MuiGrid': {
      // //   margin: '40px'
      // // },
      // display: 'flex',
      // flexGrow: 1
    },
  }
}));

// Principal export component
const CardSectionF = props => {
  const classes = useStyles();

  return (
    <React.Fragment >
    {/* //   <Button variant='outlined' color='primary' onClick={props.clickCardOpen}>
    //     Open Card Dialog
    //   </Button> */}
      {/* <Paper variant='elevation' elevation={4} style={{ minHeight: 750 }}> */}
      <Dialog
        open={props.open}
        className={classes.root}
        PaperProps={{ variant: 'elevation', elevation: 5 }}
        // fullWidth={true}
      >
        <DialogTitle id='form-dialog-title'>PAYMENT FORM</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To donate please complete this form with your credit card infomation
            and email. Only Stripe, PIOG's on-line payment provider, will see or
            retain any personal information.  This site is compliant with the Payment Card Industry and Data Security Standard.
          </DialogContentText>
          <Grid container justify='center' style={{display:'flex'}}>
            <Grid className={classes.root} item xs={12} md={5}>
              <TextField
                className={classes.root}
                label='Credit Card Number'
                name='ccnumber'
                variant='outlined'
                color='primary'
                required
                margin='dense'
                // fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInputF,
                  inputProps: {
                    component: CardNumberElement
                  }
                }}
              />
            </Grid>
            <Grid className={classes.root} item xs={12} md={5}>
              <TextField
                className={classes.root}
                label='Expiry'
                name='expiry'
                color='primary'
                inputProps={{width:'40px'}}
                // fullWidth
                variant='outlined'
                margin='dense'
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInputF,
                  inputProps: {
                    component: CardExpiryElement
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid container justify='center'style={{display:'flex'}}>
            <Grid className={classes.root} item xs={12} md={5}>
              <TextField
                className={classes.root}
                label='CVC'
                name='cvc'
                // fullWidth
                variant='outlined'
                inputProps={{ width: '40px' }}
                required
                margin='dense'
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInputF,
                  inputProps: {
                    component: CardCvcElement
                  }
                }}
              />
            </Grid>
            <Grid className={classes.root} item xs={12} md={5}>
              <TextField
                className={classes.root}
                label='email'
                name='email'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                margin='dense'
                required
                onChange={props.handleEmail}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            item
            xs={8}
            justify='flex-end'
            style={{ marginRight: '30px' }}
          >
            <Grid item xs={3}>
              <Button
                onClick={e => props.clickClose(e, 'cancel')}
                color='primary'
                variant='outlined'
              >
                Cancel
              </Button>
            </Grid>

            <Grid item xs={3}>
              <Button
                style={{ paddingRight: '24px' }}
                onClick={e => props.handleSubmit(e, props.open)}
                // onClick={e => props.clickDonate(e, 'donate')}
                variant='contained'
                color='primary'
              >
                Donate
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* </Paper> */}
    </React.Fragment>
  );
};

CardSectionF.displayName = 'StripeCardsSection';

export default CardSectionF;
