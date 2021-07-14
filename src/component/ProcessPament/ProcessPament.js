import React from 'react';
import {CardElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JCeJVSDWm9ZOtWP6Z81rQKZa07sfiXySjlwpIScGWy2RY90KETdEhcG7fwVImCgnZLec9Jo6EkGpKPOYvKdqdR600haN7IxrP');

const ProcessPament = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
        <h2>Please payment for me!</h2>
        <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        {/* <SplitCardForm></SplitCardForm> */}
    </Elements>
  );
};
export default ProcessPament;