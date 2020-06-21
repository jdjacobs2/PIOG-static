import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import Hello from './Hello';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './CheckoutForm';
import Intention from './components/Intention';
// import ConfirmOrderForm from './components/ConfirmOrderForm';
import StripeCardSectionF from './components/StripeCardSectionF';
import Spinner from './components/Spinner';
import Success from './components/Success';

const stripePromise = loadStripe('pk_test_a43QH27BoRD284Oo81fVv69b00ol5Iku1m');

const App = () => {
  const firstMount = useRef(true);

  const [amount, setAmount] = useState(10);

  const [currency, setCurrency] = useState('US Dollar');

  const [duration, setDuration] = useState('recurring');

  const [email, setEmail] = useState('');

  const [open, setOpen] = useState(false);

  const [openCard, setOpenCard] = useState(false);

  // const [donate, setDonate] = useState(false);

  const [data, setData] = useState('jk');

  const [step, setStep] = useState(0);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleClickOpen = () => {
    setStep(2);

  };

  const handleEmailClick = event => {
    setEmail(event.target.value);
  }

  const handleOpenCard = () => {
    console.log('in handleOpenCard');
    setStep(2);
  };

  const handleDonateCardClick = () => {
    setOpenCard(false);
    //  add additional donate card here
  };

  const handleCloseCardClick = () => {
    setOpenCard(false);
  };

  const handleClose = (e, func) => {
    // if (func === 'donate') {
    //   setDonate(true);
    // }
    setStep(1);
    setLoading(true);
    // setOpen(false);
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
    console.log(`step is: ${step}`);
  });

  useEffect(() => {
    if (loading) {
    }
  });

  useEffect(() => {
    if (data !== 'jk') {
      console.log('in useEffect for setOpenCard', data);
      setOpenCard(true);
    }
  }, [data]);

  useEffect(() => {
    // Only execute fetchData during and after first mount of Intention
    if (firstMount.current && step !== 1) {
      firstMount.current = false;
      return;
    }
    async function fetchData() {
      try {
        let response = await axios.post(
          'https://us-central1-piog-dd672.cloudfunctions.net/app/contribution',
          {
            data: { amount, currency, duration }
          }
        );
        if (response.data.id) {
          setData(response.data);
          setStep(2);
          // console.log('logging data.id', response.data.id);
        } else if (response.data.type) {
          setData(response.data);
          setStep(3);
          // console.log('logging data.type', response.data.type);
        }
      } catch (e) {
        console.log('error in getting paymentIntent:', e);
      }
      setLoading(false);
    }

    fetchData();
  }, [loading]);

  return (
    <Elements stripe={stripePromise}>
      <div className='App'>
        {/* <header>
          <p>From React App</p>
        </header> */}
        {/* <Hello /> */}
        <Intention
          amount={handleAmount}
          amt={amount}
          currency={handleCurrency}
          cur={currency}
          duration={handleDuration}
          dur={duration}
          open={!step}
          // clickOpen={handleClickOpen}
          close={handleClose}
        />
        {loading ? <Spinner /> : null}
        <StripeCardSectionF
          paymentIntent={data}
          open={step === 2 ? true : false}
          clickCardOpen={handleOpenCard}
          clickClose={handleCloseCardClick}
          clickDonate={handleDonateCardClick}
          clickEmail={handleEmailClick}
          setSuccess={setSuccess}
          setStep={setStep}
        />
        {step === 3 ? <h1>'Mininum Donation is US $5'</h1>: null}
        {success ? <Success /> : null}
      </div>
    </Elements>
  );
};

export default App;
