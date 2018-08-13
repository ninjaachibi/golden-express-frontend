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

class AddressScreen extends React.Component {
  static navigationOptions = {
    title:'Checkout',
  };
  constructor(props) {
    super(props);
    this.state = {
      total:0,
      cardNumber: 'card number here',
      confirmed: false,
      paid: false,
      expiremonth: 'mm',
      expireyear:'yy',
      ccv:'cvv'
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

        <ScrollView>

          <View className="items-container">
            <Text style={styles.checkOutTitle}>Order Summary</Text>

          </View>

          <View className="payment-container">
            <Text style={styles.checkOutTitle}>Payment Information</Text>
            <Card >
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
                  onChangeText={(expiremonth) => this.setState({expiremonth})}
                  value={this.state.expiremonth}
                />
                <TextInput
                  placeholder='yy'
                  style={{height: 40,width:80, borderColor: 'gray', borderWidth: 1, padding: 5}}
                  onChangeText={(expireyear) => this.setState({expireyear})}
                  value={this.state.expireyear}
                />
                <TextInput
                  placeholder='cvv'
                  style={{height: 40,width:80, borderColor: 'gray', borderWidth: 1, padding: 5, marginLeft:72}}
                  onChangeText={(cvv) => this.setState({cvv})}
                  value={this.state.cvv}
                />
              </View>

            </Card>

          </View>

          <View className="confirmation-container">
            <Text style ={{fontSize:20,marginTop:10}}>Please confirm your order: {total.toFixed(2)}</Text>
            <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={()=>{console.log('confirmed');this.order()}}>
              <Text style={styles.buttonLabel} borderColor='white'
                borderStyle='solid'>Place Order</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

      )
    }
}

export default AddressScreen;
