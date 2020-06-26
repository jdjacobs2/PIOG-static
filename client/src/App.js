import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Intention from './components/Intention';
import StripeCardSectionF from './components/StripeCardSectionF';
import Spinner from './components/Spinner';
import Success from './components/Success';
import { CardNumberElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import Intro from './components/Intro';

const App = () => {
  const stripe = useStripe();
  const elements = useElements();
  const firstMount = useRef(true);
  const [amount, setAmount] = useState(10);
  const [currency, setCurrency] = useState('US Dollar');
  const [duration, setDuration] = useState('recurring');
  const [email, setEmail] = useState('');
  // const [openCard, setOpenCard] = useState(false);
  const [data, setData] = useState(null);
  // const [dataExists, setDataExists] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [getIntention, setGetIntention] = useState(false);
  const [getPayment, setGetPayment] = useState(false);

  // const handleClickOpen = () => {
  //   setStep(0);
  // };

  const reset = () => {
    firstMount.current = true;
    setData(null);
    setStep(0);
    setLoading(false);
    setGetIntention(false);
    setGetPayment(false);
  };

  const handleEmailClick = event => {
    setEmail(event.target.value);
  };

  const handleOpenCard = () => {
    // console.log('in handleOpenCard');
    setStep(3);
  };

  // const handleDonateCardClick = () => {
  //   setOpenCard(false);
  //   //  add additional donate card here
  // };

  const handleCloseCardClick = () => {
    reset();
    // setOpenCard(false);
  };

  const handleIntentionSubmit = e => {
    // if (func === 'donate') {
    //   setDonate(true);
    // }
    // setStep(2);
    setGetIntention(true);
    setLoading(true);
    // setOpen(false);
  };

  const handleIntentionClose = e => {
    reset();
  };

  const handleDuration = event => {
    setDuration(event.target.value);
  };

  const handleCurrency = event => {
    setCurrency(event.target.value);
  };

  const handleAmount = event => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    // console.log(`step is: ${step}`);
  });

  useEffect(() => {
    // if (data !== 'jk') {
    //   console.log('in useEffect for setOpenCard', data);
    //   setOpenCard(true);
    // }
  }, [data]);

  useEffect(() => {
    if (!getPayment) {
      return;
    }
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const getPaymentF = async () => {
      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement)
        }
      });
      console.log('result from confirmCardPayment is: ', result);
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          // Show a success message to your customer
          setStep(4);
          setLoading(false);
          // setSuccess(true);
          setGetPayment(false);
          console.log('SUCCESS');
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    };
    getPaymentF();
  }, [getPayment]);

  useEffect(() => {
    // Only execute fetchData during and after first mount of Intention
    if (!getIntention) {
      console.log(
        `In first mount, step is ${step} amd firstMount.current is ${firstMount.current} `
      );
      firstMount.current = false;
      return;
    }
    console.log(
      `Before fetch intent step is ${step} amd firstMount.current is ${firstMount.current} and data is ${data} `
    );
    setLoading(true);
    async function fetchData() {
      try {
        let response = await axios.post(
          'https://us-central1-piog-dd672.cloudfunctions.net/app/contribution',
          {
            data: { amount, currency, duration, email }
          }
        );
        if (response.data.id) {
          setData(response.data);
          // setDataExists(true);
          setStep(2);
          console.log(
            `after successful fetch intent logging data.id ${response.data.id} and step = ${step}`
          );
        }
        // else if (response.data.type) {
        //   setData(response.data);
        //   console.log('before set stpe 4');
        //   setStep(4);
        //   // console.log('logging data.type', response.data.type);
        // }
      } catch (e) {
        console.log('error in getting paymentIntent:', e);
      }
      setLoading(false);
    }

    fetchData();
  }, [getIntention]);

  const handleCardSubmit = async (event, openDialog) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setLoading(true);
    setStep(99);
    setGetPayment(true);
    // openDialog = 'false';
  };

  return (
    <div className='App'>
      <Intro setStep={setStep} step={step} />
      <Intention
        amount={handleAmount}
        amt={amount}
        currency={handleCurrency}
        cur={currency}
        duration={handleDuration}
        dur={duration}
        open={step === 1}
        close={handleIntentionClose}
        submit={handleIntentionSubmit}
      />
      <StripeCardSectionF
        // paymentIntent={data}
        open={step === 2 ? true : false}
        // clickCardOpen={handleOpenCard}
        clickClose={handleCloseCardClick}
        clickEmail={handleEmailClick}
        setStepFunc={setStep}
        handleSubmit={handleCardSubmit}
      />
      {step === 3 ? console.log('step 3') : null}
      <Success open={step === 4 ? true : false} />
      {loading ? <Spinner /> : null}
    </div>
  );
};

export default App;
