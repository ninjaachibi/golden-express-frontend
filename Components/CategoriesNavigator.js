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
  ScrollView
} from 'react-native';
 // Version can be specified in package.json

import { StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

import styles from './Styles'
import ResultScreen from './ResultScreen'
import GroceryListScreen from './GroceryListScreen'
import HorizontalMealScroll from './HorizontalMealScroll'
import CheckoutScreen from './CheckoutScreen'
import FeedbackScreen from './FeedbackScreen'
import CategoriesScreen from './CategoriesScreen'




export default class Categories extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {

    }
    this.navigateCart = this.navigateCart.bind(this)
    this.openProduct = this.openProduct.bind(this)

  }

  navigateCart() {
    this.props.screenProps.cart()
  }

  openProduct(item){
    this.props.screenProps.openProduct(item)
  }

  render(){
    const stack = {
      Categories: {
        screen: CategoriesScreen,
      },

      Result: {
        screen: ResultScreen
      }
    }

    var CategoriesStack = StackNavigator(stack, {initialRouteName: 'Categories',
      headerMode: 'screen',
      navigationOptions: {
        headerVisible: true,
      }
    })
    return (
      <View style={{flex: 1}}>
        <CategoriesStack
          screenProps={{
            cart: this.navigateCart,
            openProduct: this.openProduct
          }}/>
      </View>

    )

  }

};
