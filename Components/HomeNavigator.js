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
import RegisterScreen from './RegisterScreen'
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import Result from './ResultScreen'
import GroceryListScreen from './GroceryListScreen'
import HorizontalMealScroll from './HorizontalMealScroll'
import SearchScreen from './SearchScreen'
import CheckoutScreen from './CheckoutScreen'
import FeedbackScreen from './FeedbackScreen'
import CategoriesScreen from './CategoriesScreen'
import SearchNavigator from './SearchNavigator'
import HomeSearch from './HomeSearch'






export default class HomeNavigator extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {

    }
    this.navigateCart = this.navigateCart.bind(this)
  }

  navigateCart() {
    this.props.navigation.navigate('Cart')
  }

  render(){
    const stack = {
      HomePage: {
        screen: HomeScreen,
      },
      HomeSearch: {
      screen: HomeSearch,
    },
    }

    const HomeStack = StackNavigator(stack, {initialRouteName: 'HomePage',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: true,
      }
    })
    return (
      <View style={{flex: 1}}>
        <HomeStack
          screenProps={{
            cart: this.navigateCart
          }}/>
      </View>

    )

  }

};
