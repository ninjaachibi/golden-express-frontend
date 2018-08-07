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
    }
  }

  async componentDidMount () {
    // AsyncStorage.removeItem('cart', ()=>{console.log('removed iten')})
    let cart = await AsyncStorage.getItem('cart', () => {
      console.log('got cart');
    })

    if(!cart) {
      cart = "{}";
    }
    this.setState({cart:JSON.parse(cart)});
  }

  checkout() {
    console.log('checking out');
  }

  render() {
    console.log('cart',this.state.cart);
    console.log(_.values(this.state.cart));
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}>
        <Text>Welcome to cart</Text>
        {!this.state.cart || this.state.cart.length === 0 ?
          <Text>Cart is empty</Text>
          : _.values(this.state.cart).map((item) => {
            return (
              <Text>{item.item.name}: Count: {item.count}</Text>
            )
          })
        }

        <Button title="Checkout Cart" onPress={()=>this.checkout()} />


      </View>
    )
  }
}

export default CartScreen;
