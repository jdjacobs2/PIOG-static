import React from 'react';
import {
  Grid,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField
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
      width: '25ch',
      marginBottom: '40px'
    },
    '& .MuiGrid': {
      margin: '40px'
    },
    display: 'flex',
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(3)
  }
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
      <Dialog
        open={props.open}
        PaperProps={{ variant: 'outlined' }}
        fullWidth={true}
      >
        <DialogContent>
          <Grid container justify='center'>
            <Grid className={classes.root} item xs={8}>
              {/* <StripeElementWrapperF
                label='Card Number'
                component={CardNumberElement}
              /> */}
              <TextField
                label='Credit Card Number'
                name='ccnumber'
                variant='outlined'
                color='primary'
                required
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
          </Grid>
          <Grid container justify='center'
            spacing={3}>
            <Grid item xs={4}>
              <TextField
                className={classes.root}
                label='Expiry (MM / YY)'
                name='expiry'
                variant='outlined'
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInputF,
                  inputProps: {
                    component: CardExpiryElement
                  }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='CVC'
                name='cvc'
                variant='outlined'
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInputF,
                  inputProps: {
                    component: CardCvcElement
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={e => props.clickClose(e, 'cancel')}
            color='primary'
            variant='outlined'
          >
            Cancel
          </Button>
          <Button
            onClick={e => handleSubmit(e, props.open)}
            // onClick={e => props.clickDonate(e, 'donate')}
            variant='contained'
            color='primary'
          >
            Donate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CardSectionF.displayName = 'StripeCardsSection';

export default CardSectionF;
