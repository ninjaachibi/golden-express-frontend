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
import HomeNavigator from './HomeNavigator'
import SearchResultScreen from './SearchResultScreen'




export default class SearchNavigator extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {

    }
    this.navigateCart = this.navigateCart.bind(this)
  }

  navigateCart() {
    this.props.screenProps.cart()

  }

  render(){
    const stack = {
      Search: {
        screen: SearchScreen,
      },
      SearchResults: {
      screen: SearchResultScreen
    },
    }

    var SearchStack = StackNavigator(stack, {initialRouteName: 'Search',
      headerMode: 'screen',
      navigationOptions: {
        headerVisible: false,
      }
    })
    return (
      <View style={{flex: 1}}>
        <SearchStack
          screenProps={{
            cart: this.navigateCart
          }}/>
      </View>

    )

  }

};
