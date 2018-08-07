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
  RefreshControl,
  Image,
  ScrollView,
  AsyncStorage
} from 'react-native';
import styles from './Styles'
import _ from 'underscore'

class CartScreen extends React.Component {
  static navigationOptions ={
    title: 'My Cart'
  };

  constructor() {
    super();
    this.state = {
      cart: [],
    }
  }

  async componentDidMount () {
    // AsyncStorage.removeItem('cart', ()=>{console.log('removed iten')})
    let cart = await AsyncStorage.getItem('cart')
    console.log('got cart',JSON.parse(cart));
    this.setState({cart:JSON.parse(cart)});
  }

  render() {
    console.log('cart',this.state.cart);
    // console.log(_.mapObject(this.state.cart, (item) => item))
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}>
        <Text>Welcome to cart</Text>
        {!this.state.cart || this.state.cart.length === 0 ?
          <Text>Cart is empty</Text>
          : this.state.cart.map((item)=> {
            return (
              <Text>{item.name}</Text>
            )
          })
        }


      </View>
    )
  }
}

export default CartScreen;
