// Display dialog to obtain currency, amount, and duration and
// Send to server for server to be able to get payment Intent


import React from 'react'

function Payment() {
  return (
    <div>
      
    </div>
  )
}

export default Payment




    <script>
      var stripe = Stripe('pk_test_a43QH27BoRD284Oo81fVv69b00ol5Iku1m');
      var elements = stripe.elements();

      // Create and mount Elements card--resource should have loaded
      var card = elements.create("card", { style: style });
      card.mount("#card-element");
      console.log("Element card mounted");

      //  Initialize materialize javascript after DOM loads -->
      document.addEventListener("DOMContentLoaded", function () {

        console.log('document loaded');

        // Initialize Materialize modals and forms
        var elems = document.querySelectorAll(".modal");
        var instances = M.Modal.init(elems, {});
        var selectValues = document.querySelectorAll('select');
        const selInstantances = M.FormSelect.init(selectValues, {});

        // Gather date from intent to contribute form and Retreive Payment Intent
        const getContributionForm =document.querySelector("#getContribution");
        getContributionForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const amount = parseInt(document.querySelector("#amount").value);
          const currencySelect = document.querySelector('#currency');
          const currency = currencySelect.M_FormSelect.input.value;
          let duration;
          const radioSelector = document.querySelector('input[name="duration"]:checked');
          if (radioSelector) {
            duration = radioSelector.value;
          }

          console.log(`Before httpsCallable:  amount = ${amount} and currency = ${currency} and duration = ${duration}`);

          axios.post('https://us-central1-piog-dd672.cloudfunctions.net/app/contribution', {
            data: {amount, currency, duration}
          })
          .then(response => console.log(response.data));
        });
      });

      // Set up Stripe.js and Elements to use in checkout form
      var style = {
        base: {
          color: "#32325d",
        }
      };


      card.addEventListener('change', ({error}) => {
        const displayError = document.getElementById('card-errors');
        if (error) {
          displayError.textContent = error.message;
        } else {
          displayError.textContent = '';
        }
      });

      // ----------------------------------------------------------
      //Set your publishable key: remember to change this to your live publishable key in production
      // See your keys here: https://dashboard.stripe.com/account/apikeys

      // -----------------------------------------------------------

    </script>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <section>
            <div class="modal" id="modal-elements">
              <div class="modal-content">
                <div class="col s6">
                  <form id="payment-form">
                    <div id="card-element">
                      <!-- Elements will create input elements here -->
                    </div>
                    <!-- We'll put the error messages in this element -->
                    <div id="card-errors" role="alert">
                    </div>
                    <button id="submit">Pay</button>
                  </form>
                </div>
              </div>
            </div>
    </section>