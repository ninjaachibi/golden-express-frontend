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
import { StackNavigator } from 'react-navigation';

import styles from './Components/Styles'
import RegisterScreen from './Components/RegisterScreen'
import LoginScreen from './Components/LoginScreen'
import CameraAccess from './Components/CameraAccess'
import HomeScreen from './Components/HomeScreen'
import BrowseGroceryScreen from './Components/BrowseGroceryScreen'
import GroceryListScreen from './Components/GroceryListScreen'
import HorizontalMealScroll from './Components/HorizontalMealScroll'
import SearchScreen from './Components/SearchScreen'

//Navigator
export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  BrowseGrocery: {
    screen: BrowseGroceryScreen,
  },
  GroceryList: {
    screen: GroceryListScreen,
  },
  Search: {
    screen: SearchScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  CameraAccess: {
    screen: CameraAccess,
  },
  HorizontalMealScroll: {
    screen: HorizontalMealScroll,
  }
}, {initialRouteName: 'BrowseGrocery'});
