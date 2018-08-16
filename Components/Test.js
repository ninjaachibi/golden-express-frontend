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
import CartItem from './CartItem'

class CartScreen extends React.Component {
  static navigationOptions = {
    title: 'My Cart'
  };

  constructor() {
    super();
    this.state = {
    }
    this.addToCart = this.addToCart.bind(this);
    this.getItemTotal = this.getItemTotal.bind(this);
    this.subtractFromCart = this.subtractFromCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this)
    this.openProduct = this.openProduct.bind(this)
  }

  async componentDidMount () {
    // AsyncStorage.removeItem('cart', ()=>{console.log('removed iten')})
    let cart = await AsyncStorage.getItem('cart', () => {console.log('got cart')})

    if(!cart) {
      cart = "{}";
    }
    this.setState({cart:JSON.parse(cart)});
  }

  async addToCart (item, quantity) {
    try {
      let cart = await AsyncStorage.getItem('cart', (err,res)=> {if(err)console.log('err',err);});
      cart = JSON.parse(cart);
      console.log('cart is',cart);
      if(!cart) {
        cart = {}
      }
      cart[item._id] = !!cart[item._id] ? {count: quantity + cart[item._id].count, item} : {count: quantity, item};
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log("added to cart", cart);
      this.setState({cart:cart}); //this is the only line that's different between ProductScreen's addToCart
    }
    catch(err) {
      console.log(err);
    }
  }

  /* need to account for case where count is less than 1*/
  async subtractFromCart(item) {
    try {
      let cart = await AsyncStorage.getItem('cart', (err,res)=> {if(err)console.log('err',err);});
      cart = JSON.parse(cart);
      console.log('cart is',cart);
      if (!!cart[item._id] && cart[item._id].count > 0) {
        cart[item._id] = !!cart[item._id] ? { count: --cart[item._id].count, item } : { count: 1, item };
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        console.log("subtracted from cart", cart);
        this.setState({ cart:cart })
      }
      else {
        console.log('not subtracting from cart');
      }

    }
    catch(err) {
      console.log('error', err);
    }
  }

  async deleteFromCart (item) {
    try {
      let cart = await AsyncStorage.getItem('cart', (err,res)=> {if(err)console.log('err',err);});
      cart = JSON.parse(cart);
      console.log('cart is',cart);
      delete cart[item._id];
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log("deleted from cart", cart);
      this.setState({ cart })
    }
    catch (err) {
      console.log('error', err);
    }
  }

  checkout() {
    console.log('checking out');
    this.props.navigation.navigate('Checkout', {total: this.calculateTotal(), cart: this.state.cart})
  }

  openProduct(item){

    this.props.navigation.navigate({key:'Product',routeName:'Product', params:{item: item, addToCart: this.addToCart}})
  }

  calculateTotal () {
    let ret = _.values(this.state.cart).reduce((total, item) => total + this.getItemTotal(item), 0)
    return ret;
  }

  getItemTotal(item) {
    function stripLetters (string) {
      return string.replace(/\D/g,'');
    }

    let price = Number(stripLetters(item.item.price))
    let count = item.count;
    // console.log('price', price, typeof price)
    // console.log('count', count, typeof count);
    return price * count / 100;
  }


  render() {
    console.log('cart', this.state.cart);
    console.log(_.values(this.state.cart));
    return (
      <ScrollView
        scrollEnabled={true} style={{marginBottom:30}}
      >
        <View>
          { _.isEmpty(this.state.cart) ?
            <View>
              <Text>Your cart is empty</Text>
              <TouchableOpacity style={[styles.button, styles.buttonDisabled]} disabled={true}>
                <Text style={styles.buttonLabel} borderColor='white' borderStyle='solid'>Checkout</Text>
              </TouchableOpacity>
            </View>
            :
            <View>
              <View className="cart-container">
                {
                  _.values(this.state.cart).map((item) => {
                    return (
                      <TouchableOpacity onPress={()=>{this.openProduct(item.item)}}>
                        <CartItem
                          key = {item.item._id}
                          item={item}
                          addToCart={this.addToCart}
                          subtractFromCart={this.subtractFromCart}
                          deleteFromCart={this.deleteFromCart}
                          getTotal={this.getItemTotal}
                        />
                      </TouchableOpacity>

                    )
                  })
                }
              </View>
              <Text style={styles.totalPrice}>
                Total: ${this.calculateTotal().toFixed(2)}
              </Text>

              <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={()=>{this.checkout()}}>
                <Text style={styles.buttonLabel} borderColor='white' borderStyle='solid'>Checkout</Text>
              </TouchableOpacity>
            </View>
          }

        </View>
      </ScrollView>

    )
  }
}

export default CartScreen;
