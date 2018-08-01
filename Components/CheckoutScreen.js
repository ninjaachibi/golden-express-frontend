import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  ScrollView,
  AsyncStorage,
  FlatList,
  Image
} from 'react-native';
import styles from './Styles'

import HorizontalMealScroll from './HorizontalMealScroll'

class CheckoutScreen extends React.Component {
  static navigationOptions ={
    title:'Checkout',
  };
  constructor(props)
  {
    super(props)
  }
  //run the coponoennt and have it fetch the data
  //each ingredient has i\ts own page that displays what it looks like
  //how to make an image, where do i source
  //user gives quantities
  //algo updates quantiies with respect to recipe and user's desires


  render() {
    console.log(this.state);
    return (
      <View>
        <script src="https://checkout.stripe.com/checkout.js"></script>

        <button id="customButton">Purchase</button>

        <script>


        var handler = StripeCheckout.configure({
          key: 'pk_test_em9P947GbzZeOut44HUiFFP2',
          image: 'https://www.jinx.com/content/pages/gold_exp/goldcoin_final.gif',
          locale: 'auto',
          billingAddress:'true',
          zipCode: 'true',
          shippingAddress: 'true',
          token: function(token) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
          }
        });

        document.getElementById('customButton').addEventListener('click', function(e) {
          // Open Checkout with further options:
          handler.open({
            name: 'Golden Express',
            description: 'One ingredient at a time...',
            amount: 2000,
            email:'false'
          });
          e.preventDefault();
        });

        // Close Checkout on page navigation:
        window.addEventListener('popstate', function() {
          handler.close();
        });
        </script>


      </View>

    )
  }
}

export default HomeScreen;
