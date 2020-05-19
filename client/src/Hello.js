import React, { useEffect, useState } from 'react';

const ElectDonate = props => {
  const [message, setMessage] = useState('Waiting for hello');

  const handleClick = e => {
    e.preventDefault();
    doFetch();
  };

  useEffect(() => {
    const testAuth = document.querySelector('#testAuth');
    testAuth.addEventListener('click', handleClick);
  });

  const doFetch = () => {
    fetch(
      'https://us-central1-piog-dd672.cloudfunctions.net/app/helloworld',
      // https://us-central1-taswell-f90e4.cloudfunctions.net/app/helloworld',
      {
        headers: new Headers({
          Auth: '44819bd32d8e799f3042d06ed0a3329632608c17'
        })
      }
    )
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data);
        // resp.innerHTML = data;
        setMessage(data);
      });
  };

  return (
    <>
      <h2>Please Donate</h2>
      <div style={{ marginBottom: '35px' }}>
        <button
          id='testAuth'
          className='waves-effect waves-light btn'
          // onClick={handleClick}
        >
         Firebase say 'Hello' 
        </button>
        <p>{message}</p>
      </div>
    </>
  );
};

export default ElectDonate;
