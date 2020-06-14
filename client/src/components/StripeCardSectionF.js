import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import StripeElementWrapperF from './StripeElementWrapperF';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(3)
  }
}));

const CardSectionF = () => {
  const classes = useStyles();
  return (
    <>
      <Paper variant='outlined' style={{width:'40%', margin:'auto'}}>
        <Grid container justify='center'>
          <Grid item xs={4}>
            <StripeElementWrapperF
              label='Card Number'
              component={CardNumberElement}
            />
          </Grid>
        </Grid>
        <Grid container justify='center' spacing={3}>
          <Grid item xs={4} >
            <StripeElementWrapperF
              label='Expiry (MM / YY)'
              component={CardExpiryElement}
            />
          </Grid>
          <Grid item xs={3}>
            <StripeElementWrapperF label='CVC' component={CardCvcElement} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

CardSectionF.displayName = 'StripeCardsSection';

export default CardSectionF;
