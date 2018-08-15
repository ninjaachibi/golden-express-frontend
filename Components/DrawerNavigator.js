import React from "react";
import { Dimensions } from 'react-native';
import { TabNavigator, DrawerNavigator } from "react-navigation";
import DrawerContent from "./Sidebar"
import HomeNavigator from './HomeNavigator';
import CategoriesNavigator from './CategoriesNavigator';
import SearchNavigator from './SearchNavigator';
import Test from './Test'
import Interface from './Interface'
import AccountNavigator from './AccountNavigator'
import OrderInfo from './OrderInfo'
import OrderNavigator from './OrderNavigator'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  ScrollView,
  AsyncStorage,
  FlatList,
  Image,
  WebView
} from 'react-native';

const deviceWidth  =  Dimensions.get('window').width

const DrawerStack = DrawerNavigator({
  Account: {
    screen: AccountNavigator,
  },
  Interface: {
    screen: Interface,
  },
  Five: {
    screen: OrderNavigator, //For testing
  },
  Order:{
    screen: OrderNavigator,
  },


}, {
  initialRouteName: 'Interface',
  contentComponent: DrawerContent,
  drawerWidth: deviceWidth,
  drawerPosition: 'up',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});


export default class Drawer extends React.Component{

  constructor(props)
  {
    super(props)
    this.state = {}
    this.openCart= this.openCart.bind(this)
    this.openContact= this.openContact.bind(this)
    this.openProduct = this.openProduct.bind(this)
    this.openAddress= this.openAddress.bind(this)
    this.logout = this.logout.bind(this)
  }

  openProduct(item){
    this.props.navigation.navigate({key:'Product',routeName:'Product', params:{item: item}})
  }

  openCart(){
    this.props.navigation.navigate('Cart')
  }

  openContact(){
    this.props.navigation.navigate('Contact')
  }

  openAddress(){
    this.props.navigation.navigate('Address')
  }

  logout () {
    console.log('logging out')
    this.props.navigation.navigate('Login')
  }


  render()
  {

    return (
      <View style={{flex:1}}>
        <DrawerStack screenProps={{
          openCart: this.openCart,
          openAddress: this.openAddress,
          openContact:this.openContact,
          openProduct: this.openProduct,
          logout: this.logout
        }}/>
      </View>
    )
  }






}
