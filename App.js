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
import CustomizeScreen from './Components/CustomizeScreen'
import MealScreen from './Components/MealScreen'
import CameraAccess from './Components/CameraAccess'
import HomeScreen from './Components/HomeScreen'
import MealPlanScreen from './Components/MealPlanScreen'
import GroceryListScreen from './Components/GroceryListScreen'
import MyInfoScreen from './Components/MyInfoScreen';
import HorizontalMealScroll from './Components/HorizontalMealScroll'

//Navigator
export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  MealPlan: {
    screen: MealPlanScreen,
  },
  GroceryList: {
    screen: GroceryListScreen,
  },
  Meal: {
    screen: MealScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  MyInfo: {
    screen:MyInfoScreen,
  },
  CameraAccess: {
    screen: CameraAccess,
  },
  HorizontalMealScroll: {
    screen: HorizontalMealScroll,
  }
}, {initialRouteName: 'MealPlan'});

