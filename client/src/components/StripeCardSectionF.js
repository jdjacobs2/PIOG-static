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
  Paper
} from '@material-ui/core';
// import StripeElementWrapperF from './StripeElementWrapperF';
import { useStripe, useElements, cardNumber } from '@stripe/react-stripe-js';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import StripeInputF from './StripeInputF';
// import handleSubmit from './StripeHandleOrder';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // width: '25ch',
      marginBottom: '20px'
    },
    '& > .MuiDialog-container > .MuiPaper-root': {
      minHeight: '380px'
    },
    // '& .MuiGrid': {
    //   margin: '40px'
    // },
    display: 'flex',
    flexGrow: 1
  },
}));

// Principal export component
const CardSectionF = props => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  console.log(`id of payementIntent:  ${props.paymentIntent.id}`);

  const handleSubmit = async (event, openDialog) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    openDialog = 'false';

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(
      props.paymentIntent.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement)
        }
      }
    );
    console.log('result from cardPayment is: ', result);
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('SUCCESS');
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <div className={classes.root}>
      <Button variant='outlined' color='primary' onClick={props.clickCardOpen}>
        Open Card Dialog
      </Button>
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
            retain any personal information.
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
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInputF,
                  inputProps: {
                    component: CardNumberElement
                  }
                }}
              />
            </Grid>
            <Grid className={classes.root} sitem xs={12} md={5}>
              <TextField
                className={classes.root}
                label='Expiry'
                name='expiry'
                color='primary'
                inputProps={{width:'40px'}}
                fullWidth
                variant='outlined'
                margin='dense'
                required
                // fullWidth
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
                onClick={e => handleSubmit(e, props.open)}
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
    </div>
  );
};

CardSectionF.displayName = 'StripeCardsSection';

export default CardSectionF;
