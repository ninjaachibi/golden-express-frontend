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
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon} from 'react-native-elements';

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import styles from './Styles'
import RegisterScreen from './RegisterScreen'
import LoginScreen from './LoginScreen'
import ResultScreen from './ResultScreen'
import GroceryListScreen from './GroceryListScreen'
import HorizontalMealScroll from './HorizontalMealScroll'
import SearchScreen from './SearchScreen'
import CheckoutScreen from './CheckoutScreen'
import FeedbackScreen from './FeedbackScreen'
import CategoriesScreen from './CategoriesScreen'
import CartScreen from './CartScreen'
import HomeNavigator from './HomeNavigator'
import CategoriesNavigator from './CategoriesNavigator'
import SearchNavigator from './SearchNavigator'
import DrawerNavigator from './DrawerNavigator'

const Tabs = TabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />,
      tabBarLabel:'Home',
      header:null,

      headerStyle: {
        backgroundColor: "white",
      }    }
  },


  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon:({ tintColor }) => <Ionicons name='ios-search' size={30} color={tintColor} />,
      tabBarLabel:'Search',
      header:null,

      headerStyle: {
        backgroundColor: "white",
      },
    }
  },

  Categories: {
    screen: CategoriesNavigator,
    navigationOptions: {
      tabBarIcon:({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />,
      tabBarLabel:'Category',
      headerStyle: {
        backgroundColor: "white",
      }
    }
  },
  // GroceryList: {
  //   screen: GroceryListScreen,
  //   navigationOptions: {
  //     tabBarIcon:({ tintColor }) => <Ionicons name='ios-basket' size={30} color={tintColor} />,
  //     tabBarLabel:'Grocery'
  //   }
  // },


},
{initialRouteName:'Home',

}
)

export default class Interface extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {};
    this.navigateCart = this.navigateCart.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openProduct = this.openProduct.bind(this);
  }

  openProduct(item){
    this.props.screenProps.openProduct(item)
  }

  openDrawer(){
    this.props.navigation.navigate('DrawerOpen')
  }

  closeDrawer(){
    this.props.navigation.navigate('DrawerClose')
  }

  navigateCart(){
    this.props.screenProps.openCart()
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Tabs screenProps={{
          cart: this.navigateCart,
          openDrawer: this.openDrawer,
          closeDrawer: this.closeDrawer,
          openProduct:this.openProduct
        }}/>
      </View>

    )
  }


}
