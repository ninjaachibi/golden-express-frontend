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

export default class AccountNavigator extends React.Component{
  
  constructor(props)
  {
    super(props);
    this.state = {
      name:"",
    }
    this.navigateHome = this.navigateHome.bind(this)
    this.openDrawer = this.openDrawer.bind(this)
    this.openContact = this.openContact.bind(this)
  }

  openDrawer(){
    this.props.screenProps.openDrawer()
  }

  openContact(){
    this.props.screenProps.openContact()
  }

  navigateHome() {
    this.props.navigation.navigate('Home')
  }

  render(){

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity title="Contact" style={{backgroundColor:'red', flex:1}} onPress={()=> this.openContact()}/>
      </View>

    )

  }

};
