import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import Hello from './Hello';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './CheckoutForm';
import Intention from './components/Intention';
// import ConfirmOrderForm from './components/ConfirmOrderForm';
import StripeCardSectionF from './components/StripeCardSectionF';

const stripePromise = loadStripe('pk_test_a43QH27BoRD284Oo81fVv69b00ol5Iku1m');

const App = () => {
  const firstMount = useRef(true);

  const [amount, setAmount] = useState(10);

  const [currency, setCurrency] = useState('US Dollar');

  const [duration, setDuration] = useState('recurring');

  const [open, setOpen] = useState(false);

  const [openCard, setOpenCard] = useState(false);

  const [donate, setDonate] = useState(false);

  const [data, setData] = useState('jk');

  const [step, setStep] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenCard = () => {
    console.log('in handleOpenCard');
    setOpenCard(true);
  };

  const handleDonateCardClick = () => {
    setOpenCard(false);
    //  add additional donate card here
  };

  const handleCloseCardClick = () => {
    setOpenCard(false);
  };

  const handleClose = (e, func) => {
    if (func === 'donate') {
      setDonate(true);
    }
    setOpen(false);
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
    if (data !== 'jk') {
      console.log('in useEffect for setOpenCard', data);
      setOpenCard(true);
    }
  }, [data]);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    async function fetchData() {
      let response = await axios.post(
        'https://us-central1-piog-dd672.cloudfunctions.net/app/contribution',
        {
          data: { amount, currency, duration }
        }
      );
      setData(response.data);
      console.log('logging data', response.data);
    }
    fetchData();
  }, [donate]);

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
          open={open}
          clickOpen={handleClickOpen}
          close={handleClose}
        />
        <StripeCardSectionF
          paymentIntent={data}
          open={openCard}
          clickCardOpen={handleOpenCard}
          clickClose={handleCloseCardClick}
          clickDonate={handleDonateCardClick}
        />
      </div>
    </Elements>
  );
};

export default App;
