/** @mat */

// const functions = require("firebase-functions");
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });
const bodyParser = require('body-parser');
// const multer = require("multer");
const path = require('path');
const stripe = require('stripe')('sk_test_Wpvw1nttzjNxrypDAZNSsdUR00RplHTNGs');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.getMessage = functions.https.onRequest((req, resp) => {
//   resp.set("Access-Control-Allow-Origin", "*");
//   console.log("Success");
//   resp.send("From getMessage");
// });

const app = express();
app.use(cors);
// var upload = multer();
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser());

// test of get using custom key
// from:  https://medium.com/@nschairer/how-to-protect-firebase-https-cloud-functions-f12d1a22370d
app.get('/helloworld', (req, res) => {
  // const key = functions.config().helloworld.key;
  // console.log("the key is ", key);
  // // const req_key = req.header('auth');
  // const { headers } = req;
  // req_key = headers["auth"];
  // console.log("req_key:", req_key);
  // console.log("headers:", req.headers);
  // if (key === req_key) {
  //   res.status(200).send("Hello from Firebase!");
  // } else {
  //   res.status(400).send("Error 400: Bad key");
  // }
  res.send(`I want to donate`);
});

app.get('/secret', async (req, res) => {
  const intent = res.json({ client_secret: intent.client_secret }); // ... Fetch or create the PaymentIntent
});

app.post('/charge', (req, res) => {
  console.log(req.body);
  res.json(req.body);
  // res.send('Reached route /charge')
});

exports.app = functions.https.onRequest(app);

exports.getContribution = functions.https.onCall(async (data, context) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   if ( data.amount === 0) {
  //     // Throwing an HttpsError so that the client gets the error details.
  //     throw new functions.https.HttpsError(
  //       "invalid-argument",
  //       "The function must be called with " +
  //         'one arguments "text" containing the message text to add.'
  //     );
  //   } else {
  //     console.log(data.amount, data.currency);
  //     return data.amount;
  //   }
  // });
  console.log('in getContributions');
  console.log(data.amount);
  console.log(data.currency);
  console.log(data.duration);

  const amount = parseInt(data.amount);
  let currency;
  switch (data.currency) {
    case 'US Dollars':
      currency = 'usd';
      break;
    case 'Pounds':
      currency = 'gbp';
      break;
    case 'Canadian Dollars':
      currency = 'cad';
      break;
    case 'Euros':
      currency = 'eur';
      break;
    default:
      console.log('Invalid currency');
  }

  console.log(`currency is ${currency} and amount is ${amount}`);

  const paymentIntent = await stripe.paymentIntents.create({
    currency: currency,
    amount: amount,
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: 'accept_a_payment' }
  });

  // return 'out of index.js';

  if (paymentIntent) {
    return paymentIntent;
  } else {
    return 'error:  no payment intent';
  }
});
