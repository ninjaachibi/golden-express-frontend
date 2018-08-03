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


  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}>
        <Text>Welcome to cart</Text>


      </View>
    )
  }
}

export default CartScreen;
