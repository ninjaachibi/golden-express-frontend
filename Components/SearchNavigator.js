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
import SearchResultsScreen from './SearchResultsScreen'



const stack = {
  Search: {
    screen: SearchScreen,
  },
  SearchResults: {
  screen: SearchResultsScreen
},
}

var SearchStack = StackNavigator(stack, {initialRouteName: 'Search',
  headerMode: 'screen',
  navigationOptions: {
    headerVisible: false,
  }
})

export default class SearchNavigator extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {

    }
    this.navigateCart = this.navigateCart.bind(this)
    this.openProduct = this.openProduct.bind(this)

  }

  openDrawer(){
    this.props.screenProps.openDrawer()
  }

  closeDrawer(){
    this.props.screenProps.closeDrawer()
  }

  navigateCart() {
    this.props.screenProps.cart()
  }
  openProduct(item){
    this.props.screenProps.openProduct(item)
  }



  render(){
    const stack = {
      Search: {
        screen: SearchScreen,
      },
      SearchResults: {
      screen: SearchResultsScreen
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
            cart: this.navigateCart,
            openDrawer: this.openDrawer,
            closeDrawer: this.closeDrawer,
            openProduct:this.openProduct
          }}/>
      </View>
    )
  }
};
