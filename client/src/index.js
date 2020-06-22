import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_a43QH27BoRD284Oo81fVv69b00ol5Iku1m');

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
