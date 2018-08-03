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
<<<<<<< HEAD
  Image,
  WebView
=======
  Image
>>>>>>> master
} from 'react-native';
import styles from './Styles'

import HorizontalMealScroll from './HorizontalMealScroll'
<<<<<<< HEAD
let stripeAPI = `
<script src="https://checkout.stripe.com/checkout.js"></script>
<style>
html, body {
  background-color: gold;
}
#customButton {
 display:inline-block;
 padding:0.3em 1.2em;
 margin:0 0.3em 0.3em 0;
 border-radius:2em;
 box-sizing: border-box;
 text-decoration:none;
 font-family:'Roboto',sans-serif;
 font-weight:300;
 color:#FFFFFF;
 background-color:#4eb5f1;
 text-align:center;
 transition: all 0.2s;
}
#customButton:hover{
 background-color:#4095c6;
}
@media all and (max-width:30em){
 #customButton{
  display:block;
  margin:0.2em auto;
 }
}
</style>
<button style="height: '360px'; width:'1080px'" id="customButton">Purchase</button>

<script>


var handler = StripeCheckout.configure({
  key: 'pk_test_em9P947GbzZeOut44HUiFFP2',
  image: 'https://www.jinx.com/content/pages/gold_exp/goldcoin_final.gif',
  locale: 'auto',
  billingAddress:'true',
  zipCode: 'true',
  shippingAddress: 'true',
  token: function(token) {
    // You can access the token ID with token.id.
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
`
=======

>>>>>>> master
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
<<<<<<< HEAD
      <View style={{flex: 1, backgroundColor: 'gold', alignItems: 'stretch', position:'absolute', top:0,bottom:0,left:0,right:0 }}>
        <WebView scalesPageToFit={false}
        scrollEnabled={false} source={{html:stripeAPI}} style={{backgroundColor: 'gold',position:'absolute', top:0,bottom:0,left:0,right:0}}/>

=======
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
>>>>>>> master


      </View>

    )
  }
}

<<<<<<< HEAD
export default CheckoutScreen;
=======
export default HomeScreen;
>>>>>>> master
