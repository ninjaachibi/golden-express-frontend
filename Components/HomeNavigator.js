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
import HomeResults from './HomeResults'
export default class HomeNavigator extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
    }
    this.navigateCart = this.navigateCart.bind(this)
    this.navigateHome = this.navigateHome.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.openDrawer = this.openDrawer.bind(this)
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
  navigateHome() {
    this.props.navigation.navigate('Home')
  }
  openProduct(item){
    this.props.screenProps.openProduct(item)
  }
  render(){
    const stack = {
      HomePage: {
        screen: HomeScreen,
      },
      HomeSearch: {
      screen: HomeSearch,
    },
    HomeResults: {
      screen: HomeResults
    }
    }
    const HomeStack = StackNavigator(stack, {initialRouteName:'HomePage',
      headerMode: 'screen',
      navigationOptions: {
        headerVisible: true,
      }
    })
    return (
      <View style={{flex: 1}}>
        <HomeStack
          screenProps={{
            cart: this.navigateCart,
            home: this.navigateHome,
            openDrawer: this.openDrawer,
            closeDrawer: this.closeDrawer,
            openProduct: this.openProduct
          }}/>
      </View>
    )
  }
};
