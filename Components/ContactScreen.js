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
import _ from 'underscore';
import styles from './Styles';
import {Header, Icon, Card,Avatar} from 'react-native-elements';
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
class ContactScreen extends React.Component {
  static navigationOptions = {
    title:'Account Information',
  };
  constructor(props) {
    super(props);
    this.state = {
      total:0,
      cardNumber: 'card number here',
      confirmed: false,
      paid: false,
      firstName: 'Charles',
      lastName:'Deng',
      ccv:'cvv',
      email:'Charlesdeng98@gmail.com',
      phoneNumber: '6263742088'
    };
  }

  componentDidMount () {
    let total = this.props.navigation.getParam('total', 0);
    let cart = this.props.navigation.getParam('cart', {})
    console.log('got total', total, 'cart', cart);
    this.setState({total, cart})
  }


  render() {
    console.log(this.state);
    let { total, cart, paid, confirmed } = this.state;
    return (

      <View style={{flex: 1, alignItems: 'stretch', position:'absolute', top:0,bottom:0,left:0,right:0 }}>
        {/* <WebView
          scalesPageToFit={false}
          scrollEnabled={false}
          source={{html:stripeAPI}}
          style={{backgroundColor: 'gold',position:'absolute', top:0,bottom:0,left:0,right:0}}
        /> */}
        <ScrollView>
          <View>
            { confirmed ?
              paid ? <Text>payment went through</Text>: <Text>problem with payment</Text>
              :
              null
            }
          </View>
          <View style={{flex:1, justifyContent:'flex-start'}}>
            <Card containerStyle={{height:50, justifyContent:'flex-start'}}>
              <Text style={{marginTop:-11.5, fontSize:12}}> Email Address </Text>
              <Text style={{fontSize:12, fontWeight:'700', marginTop:5}}> {this.state.email} </Text>
            </Card>
          </View>

          <View className="payment-container">
            <Card >

                <View style={styles.inputLabels}>

                <Text style={{fontSize:12}}>First name</Text>
                <Text style={{marginLeft:98,fontSize:12}}>Last name</Text>

              </View>
              <View style={styles.paymentBox}>

                <TextInput
                  placeholder='First name'
                  style={{height: 45,width:152, borderColor: 'gray', borderWidth: 1, padding: 5, paddingTop:15, fontSize:14}}
                  onChangeText={(firstName) => this.setState({firstName})}
                  value={this.state.firstName}/>
                <TextInput
                  placeholder="Last name"
                  style={{height: 45,width:152, borderColor: 'gray', borderWidth: 1, padding: 5,marginLeft:5,paddingTop:15}}
                  onChangeText={(lastName) => this.setState({lastName})}
                  value={this.state.lastName}
                />
              </View>
              <TextInput
                keyboardType={"numeric"}
                placeholder='Phone number'
                style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
                onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                value={this.state.phoneNumber}
              />
            </Card>

          </View>


          </ScrollView>
        </View>

      )
    }
}

export default ContactScreen;
