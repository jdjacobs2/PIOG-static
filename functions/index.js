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

app.get('/helloworld', (req, res) => {
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

app.post('/contribution', async (req, res) => {
  // exports.getContribution = functions.https.onCall(async (data, context) => {

  res.header('Access-Control-Allow-Origin', '*');
  console.log('in Contributions');
  console.log('req.body is > ', req.body);
  console.log(req.body.data.amount);
  console.log(req.body.data.currency);
  console.log(req.body.data.duration);

  const amount = parseInt(req.body.data.amount);
  console.log('after parseInt amount = ', amount);
  let currency;
  switch (req.body.data.currency) {
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

  console.log('currency is ', currency, ' and amount is ', amount);
  
  const paymentIntent = await stripe.paymentIntents.create({
    currency: currency,
    amount: amount,
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: 'accept_a_payment' }
  })
    .then(response => res.json(response));
  // req.json(paymentIntent);


  // res.send(`currency is ${currency} and amount is ${amount}`);

});
  
  
  
  
exports.app = functions.https.onRequest(app);
