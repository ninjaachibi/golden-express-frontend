import React from "react";
import { Dimensions } from 'react-native';
import { TabNavigator, DrawerNavigator } from "react-navigation";
import DrawerContent from "./Sidebar"
import HomeNavigator from './HomeNavigator';
import CategoriesNavigator from './CategoriesNavigator';
import SearchNavigator from './SearchNavigator';
import Test from './Test'
import Interface from './Interface'

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
  One: {
    screen: CategoriesNavigator,
  },
  Three: {
    screen: Interface,
  },
  Five: {
    screen: HomeNavigator,
  },
  
}, {
  initialRouteName: 'Three',
  contentComponent: DrawerContent,
  drawerWidth: deviceWidth*3/4,
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
  }

  openCart(){
    this.props.navigation.navigate('Cart')
  }

  render()
  {

    return (
      <View style={{flex:1}}>
        <DrawerStack screenProps={{
          openCart: this.openCart}}/>
      </View>
    )
  }






}
