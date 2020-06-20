import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import CardDetails from './CardDetails';

const useStyles = makeStyles({
  buttonDivStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: '15px'
  },
  text: {
    textTransform: 'capitalize'
  }
});

export default function ConfirmOrderForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen'
        }
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <div className={classes.buttonDivStyle}>
      <form onSubmit={handleSubmit}>
        <CardDetails />
        <Button disabled={!stripe} variant='text' classes={{classes:'text'}} color='primary' className={classes.buttonStyle}>Confirm order</Button>
      </form>
    </div>
  );
}
