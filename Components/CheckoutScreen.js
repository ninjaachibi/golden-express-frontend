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
  WebView,
  KeyboardAvoidingView
} from 'react-native';
import _ from 'underscore';
import styles from './Styles';
import {Header, Icon, Card, Avatar,FormLabel, FormInput, FormValidationMessage, } from 'react-native-elements';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import StepIndicator from 'react-native-step-indicator';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
// import PaymentInfoScreen from './PaymentInfoScreen'
function alertError(message) {
  Alert.alert(
    'Error',
    message,
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => {
        console.log('OK pressed');
      }},
    ],
    { cancelable: false }
  )
}
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
const labels = ["Order Summary","Delivery Address","Payment Method","Submit"];
const Pages = ['Page1','Page2','Page3','Page4'];
const getStepIndicatorConfig =({position, stepStatus}) =>{
  const iconConfig = {
    name:'feed',
    color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
    size: 15,
  }
  switch(position){
    case 0: {
      iconConfig.name = 'shopping-cart';
      break;
    }
    case 1: {
      iconConfig.name = 'location-on';
      break;
    }
    case 2: {
      iconConfig.name = 'payment';
      break;
    }
    case 3: {
      iconConfig.name = 'track-changes';
      break;
    }
    default: {
      break;
    }
  }
    return iconConfig;
}
class CheckoutScreen extends React.Component {
  static navigationOptions = {
    title:'Checkout',
  };
  constructor(props) {
    super(props);
    this.validation=this.validation.bind(this)
    this.state = {
      currentPosition: 0,
      tax:0,
      markup:0,
      total:0,
      cart: {},
      confirmed: false,
      paid: false,
      cardNumber: '',
      expMonth: '',
      expYear:'',
      cvc:'',
      cardValid: false,
      instructions: '',
      name: '',
      userName:'',
      phone: '',
      address: '',
      city:'',
      state:'',
      errorMessage: null,
      ZIP:''
    };
    this.order = this.order.bind(this)
    this.onPageChange=this.onPageChange.bind(this)
    this.viewabilityConfig = {itemVisiblePercentThreshold: 40}
  }
  componentWillReceiveProps(nextProps,nextState){
    if(nextState.currentPage != this.state.currentPage){
      if(this.viewPager){
        this.viewPager.setPage(nextState.currentPage)
      }
    }
  }
  async componentDidMount () {
    let total = this.props.navigation.getParam('total', 0);
    let tax = total *0.08
    let markup = total*0.2
    let cart = this.props.navigation.getParam('cart', {});
    console.log('got total', total, 'cart', cart);
    this.setState({total, cart,tax,markup})
  }
  validation(input){
    if(input.length===0){
      this.setState({errorMessage:'This field is required'})
    }
  }
  order() {
    let { cardNumber, expMonth, expYear, cvc, total, address, ZIP,markup } = this.state;
    // cardNumber = "5555555555554444";
    // expMonth = '1';
    // expYear = '2020'
    // cvc = '123';
    // address = '851 California'
    console.log('order', cardNumber, expMonth, expYear, cvc, total, address);
    fetch(`https://api.stripe.com/v1/tokens?card[number]=${cardNumber}&card[exp_month]=${expMonth}&card[exp_year]=${expYear}&card[cvc]=${cvc}&amount=${Math.round(total*100)}&currency=usd`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": 'Bearer ' + 'pk_live_apspd6PtgprdnbOOtJj5QVqG', //live key for GE
      }
    })
    .then(resp => {
      // console.log(resp);
      return resp.json()
    })
    .then(data => {
      // HERE WE HAVE ACCESS TO THE TOKEN TO SEND IT TO OUR SERVERS
      // ALONG WITH INSENSITIVE DATA
      console.log('data', data);
      if(data.error) {
        console.log('ERROR', data.error);
        this.setState({
          message: data.error.message,
          paid: false,
          confirmed: true,
        })
        alertError(data.error.message);
      }
      else {
        fetch('https://golden-express.herokuapp.com/payments', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stripeToken: data.id,
            total: total ,
            //need to include name, identifying information
          })
        })
        .then((resp) => {
          console.log('yaaayaya')
          return resp.json()
        })
        .then(async function(response) {
          console.log('response', response);
          if(!response.success) {
            this.setState({paid: false, confirmed: true, message: response.message})
          }
          else if(response.charge.paid) {
            // DO SOMETHING AFTER PAYMENT CONFIRMATION
            this.setState({paid: true, confirmed: true, message: 'payment went through'});
            let token = await AsyncStorage.getItem('token');
            console.log('got token from AsyncStorage', token);
            //send an order request to the database
            fetch(`https://golden-express.herokuapp.com/Order`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify({
                totalPrice: this.state.total,
                userName:this.state.userName,
                ZIP:this.state.ZIP,
                address: this.state.address,
                phone:this.state.phone,
                items: _.values(this.state.cart).map((item) => {
                  return {
                    count: item.count,
                    name: item.item.name,
                    itemId: item.item._id
                  }
                })
              })
            })
            .then((resp) => resp.json())
            .then(async (resp) => {
              console.log('order fulfilled',resp);
              if(resp.success) {
                Alert.alert(
                  'Success',
                  'Your order is in and will arrive soon',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {console.log('OK pressed');}},
                  ],
                  { cancelable: false }
                )
                await AsyncStorage.removeItem('cart', ()=>{console.log('cleared cart');})
                this.props.navigation.navigate('Drawer')
              }
              else {
                alertError(resp.message)
              }
            })
            .catch(err => {
              console.log('ERROR',err);
            })
          }
          else {
            alertError('Problem with payment, please call (214)-475-9824')
            this.setState({paid: false, confirmed: true, message: 'problem with payment'})
          }
        }.bind(this)).catch(err => console.error(err));
      }
    })
  }
  _onChange = form => {
    console.log(form);
    let {values,valid} = form;
    this.setState({
      cardNumber: values.number,
      expMonth: values.expiry.split('/')[0],
      expYear: values.expiry.split('/')[1],
      cvc: values.cvc,
      cardValid: valid,
      currentPosition:2
    })
  }
  onPageChange(position){
      this.setState({currentPosition: position});
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    const visibleItemsCount = viewableItems.length;
    if(visibleItemsCount != 0) {
    this.setState({currentPage:viewableItems[visibleItemsCount-1].index})
  };
}
renderViewPagerPage = (data) => {
  return(<View style={styles.page}>
    <Text>{data}</Text>
  </View>)
}

  render() {
    // console.log(_.values(this.state.cart).map((item) => {
    //   return {
    //     count: item.count,
    //     name: item.item.name,
    //     itemId: item.item._id
    //   }
    // }));
    let { total, cart, paid, confirmed, message, cardValid, address, userName, phone, ZIP,tax,markup } = this.state;
    console.log('state', this.state);
    return (
      <KeyboardAvoidingView style={[styles.container,{flex: 1, alignItems: 'stretch', position:'absolute', top:0,bottom:0,left:0,right:0}]} behavior="padding" enabled>
        {/* <WebView
          scalesPageToFit={false}
          scrollEnabled={false}
          source={{html:stripeAPI}}
          style={{backgroundColor: 'gold',position:'absolute', top:0,bottom:0,left:0,right:0}}
        /> */}
        <View style={{marginTop:95}}>
          <StepIndicator
          stepCount={4}
          currentPosition={this.state.currentPosition}
          labels={labels}/>
         <ScrollView>
          {/* <ViewPager
          style={{flexGrow:1}}
          ref={(viewPager) => {this.viewPager = viewPager}}
          onPageSelected={(page) => {this.setState({currentPage:page.position})}}
          >
            {Pages.map((page) => this.renderViewPagerPage(page))}
          </ViewPager> */}
          <View>
            { confirmed ?
              paid ?
              <Text>{message}</Text> : <Text>problem with payment: {message}</Text>
              :
              null
            }
          </View>
          <Text style={[styles.welcome, {color:'red'}]}>Beta Test: If have any questions/problems, call (214)475-9824</Text>

          <View className="items-container">
            <Text style={styles.checkOutTitle}>Order Summary</Text>
            <TouchableOpacity onPress={()=>{this.onPageChange(0)}}>
            <Card>
              <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
              <Text style={{fontWeight:'bold'}}> Quantity</Text>
              <Text style={{fontWeight:'bold', marginRight:140}}>Item Name</Text>

              </View>
              {_.values(cart).map((item)=>
                <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly'}}>
                  <Text key={item.item._id} style={{marginLeft:25, fontSize:13}}>{item.count}</Text>
                  <Text style={{fontSize:11, marginLeft: 54}}>  {item.item.name}</Text>
                </View>)}
                <View style={{alignItems:'flex-end'}}>
              <Text style={{ marginLeft:180}}>Service Fee: ${markup.toFixed(2)}</Text>
              <Text style={{ marginLeft:235}}>Tax: ${tax.toFixed(2)}</Text>
              <Text style={{fontWeight:'bold', marginLeft:210}}>Total: ${total.toFixed(2)}</Text>
            </View>

            </Card>
            </TouchableOpacity>
            </View>
            <View className="personal-info-container">
            <Text style={styles.checkOutTitle}>Delivery Address</Text>
            <Card>
            {/* <FormLabel>Any special instructions about your order?</FormLabel>
            <FormInput onChangeText={(instructions)=>this.setState({instructions})}/> */}
            <FormLabel>Name</FormLabel>
            <FormInput  onChangeText={(userName) => this.setState({userName})}
                        value={this.state.userName}
                        onChange={()=>{this.onPageChange(1)}}
                        />
            <FormValidationMessage>{this.validation}</FormValidationMessage>
            <FormLabel>Phone Number</FormLabel>
            <FormInput onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                        onChange={()=>{this.onPageChange(1)}}
                        />
            <FormLabel>Address Line</FormLabel>
            <FormInput onChangeText={(address) => this.setState({address})}
                        onChange={()=>{this.onPageChange(1)}}/>
            <FormLabel>City</FormLabel>
            <FormInput onChangeText={(city) => this.setState({city})}
                        onChange={()=>{this.onPageChange(1)}}/>
            <FormLabel>State</FormLabel>
            <FormInput onChangeText={(state) => this.setState({state})}
                      onChange={()=>{this.onPageChange(1)}}/>
            <FormLabel>ZIP</FormLabel>
            <FormInput onChangeText={(ZIP) => this.setState({ZIP})}
                      onChange={()=>{this.onPageChange(1)}}/>
            </Card>
          </View>
          <View className="payment-container">
            <Text style={styles.checkOutTitle}>Payment Information</Text>
            {/* <CreditCardInput onChange={this._onChange} /> */}
            <Card>
              <LiteCreditCardInput onChange={this._onChange}/>
            </Card>
            {/* <Card>
              <TextInput
                placeholder='Card Number'
                style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10}}
                onChangeText={(cardNumber) => this.setState({cardNumber})}
                value={this.state.cardNumber}
              />
              <View style={styles.paymentBox}>
                <TextInput
                  placeholder='mm'
                  style={{height: 40,width:80, borderColor: 'gray', borderWidth: 1, padding: 5}}
                  onChangeText={(expMonth) => this.setState({expMonth})}
                  value={this.state.expMonth}
                />
                <TextInput
                  placeholder='yyyy'
                  style={{height: 40,width:80, borderColor: 'gray', borderWidth: 1, padding: 5}}
                  onChangeText={(expYear) => this.setState({expYear})}
                  value={this.state.expYear}
                />
                <TextInput
                  placeholder='cvc'
                  style={{height: 40,width:80, borderColor: 'gray', borderWidth: 1, padding: 5, marginLeft:72}}
                  onChangeText={(cvc) => this.setState({cvc})}
                  value={this.state.cvc}
                />
              </View>
            </Card> */}
          </View>
          <View className="confirmation-container">
            <Text style ={{fontSize:20,marginTop:10,marginLeft:16.5,fontWeight:'bold'}}>Please confirm your order: ${total.toFixed(2)}</Text>
            {cardValid && address && userName && phone && ZIP ? //cardValid && address
              <TouchableOpacity
                style={[styles.button, styles.buttonBlue]}
                // onPress={()=>{_.throttle(this.order, 3000, {trailing: false})()}}






                onPress={()=> {
                  console.log('pressed');
                  Alert.alert(
                    'Order Confirmation',
                    'Is this everything you want?',
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'Confirm Order', onPress: () => {
                        console.log('confirmed');
                        this.order();
                      }},
                    ],
                    { cancelable: false }
                  )
                }}
              >
                <Text style={styles.buttonLabel} borderColor='white' borderStyle='solid'>Place Order</Text>
              </TouchableOpacity>
              :
              <View>
                <Text style={{marginLeft:15, fontSize:20}}>Fill the form out fully in order to place order</Text>
               <View style={{marginBottom:85}}>
                <TouchableOpacity style={[styles.button, styles.buttonDisabled]} disabled={true}>
                  <Text style={styles.buttonLabel} borderColor='white' borderStyle='solid'>Place Order</Text>
                </TouchableOpacity>
                </View>
              </View>
            }
          </View>
          <View style={{ height: 50 }} />

          </ScrollView>
          <View style={{ height: 100 }} />
        </View>
        </KeyboardAvoidingView>
      )
    }
}
export default CheckoutScreen;
