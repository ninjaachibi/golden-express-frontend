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
  Image,
  WebView
} from 'react-native';
import _ from 'underscore'
import styles from './Styles'
// import PaymentInfoScreen from './PaymentInfoScreen'

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
class CheckoutScreen extends React.Component {
  static navigationOptions = {
    title:'Checkout',
  };
  constructor(props) {
    super(props);
    this.state = {
      total:0,
      cardNumber: 'card number here'
    };
  }

  componentDidMount () {
    let total = this.props.navigation.getParam('total', 0);
    let cart = this.props.navigation.getParam('cart', {})
    console.log('got total', total, 'cart', cart);
    this.setState({total, cart})
  }

  order() {
    fetch('https://api.stripe.com/v1/tokens?card[number]=4242424242424242&card[exp_month]=1&card[exp_year]=2020&card[cvc]=123&amount=999&currency=usd', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": 'Bearer ' + 'pk_test_JticRNIVAhMYRtChvuRtTS6p', //this is rob's public API KEY
      }
    })
    .then(resp => {
      console.log(resp);
      return resp.json()
    })
    .then(data => {
      // HERE WE HAVE ACCESS TO THE TOKEN TO SEND IT TO OUR SERVERS
      // ALONG WITH INSENSITIVE DATA
      fetch('http://localhost:3000/payments', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({stripeToken: data.id})
      })
      .then(resp => resp.json())
      .then(function(response) {
        console.log('response',response);
        if(response.paid) {
          // DO SOMETHING AFTER PAYMENT CONFIRMATION
        }
      }.bind(this)).catch(err => console.error(err));
    })
  }

  render() {
    console.log(this.state);
    let { total, cart } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'gold', alignItems: 'stretch', position:'absolute', top:0,bottom:0,left:0,right:0 }}>
        {/* <WebView
          scalesPageToFit={false}
          scrollEnabled={false}
          source={{html:stripeAPI}}
          style={{backgroundColor: 'gold',position:'absolute', top:0,bottom:0,left:0,right:0}}
        /> */}

        <View className="items-container">
          <Text>items here</Text>
          {_.values(cart).map((item)=><Text key={item.item._id}>{item.count} {item.item.name}</Text>)}
        </View>

        <View className="payment-container">
          <Text>Payment here</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10}}
            onChangeText={(cardNumber) => this.setState({cardNumber})}
            value={this.state.cardNumber}
          />
        </View>

        <View className="confirmation-container">
          <Text>Please confirm your order: {total}</Text>

          <Button title="place order" onPress={()=>{console.log('confirmed');this.order()}}/>
        </View>

      </View>

    )
  }
}

export default CheckoutScreen;
