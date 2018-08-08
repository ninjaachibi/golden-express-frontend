import React, { Component } from 'react';
import { View } from 'react-native';
import stripe from 'tipsi-stripe';

stripe.init({
  publishableKey: 'insert publisable key here',
});

export default class PaymentInfoScreen extends Component {
  componentDidMount() {

    const options = {
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'zip', // or 'full'
      theme
    };

    stripe.paymentRequestWithCardForm(options)
    .then(response => {
      // Get the token from the response, and send to your server
    })
    .catch(error => {
      // Handle error
    });
  }

  render() {
    return <View />
  }
}
