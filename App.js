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
import styles from './Components/Styles'
import RegisterScreen from './Components/RegisterScreen'
import LoginScreen from './Components/LoginScreen'
import HomeScreen from './Components/HomeScreen'
import BrowseGroceryScreen from './Components/BrowseGroceryScreen'
import GroceryListScreen from './Components/GroceryListScreen'
import HorizontalMealScroll from './Components/HorizontalMealScroll'
import SearchScreen from './Components/SearchScreen'
import CheckoutScreen from './Components/CheckoutScreen'
import FeedbackScreen from './Components/FeedbackScreen'
import CategoriesScreen from './Components/CategoriesScreen'
<<<<<<< HEAD
import HomeNavigator from './Components/HomeNavigator'
// import Stack from './Components/navigation/Stack.js'
//Navigator
const Tabs = TabNavigator({
  Categories: {
=======


import Stack from './Components/navigation/Stack.js'
import {createStore} from 'redux'
import { Provider } from 'react-redux'

//Navigator


const Tabs = TabNavigator({
  Categories: { 
>>>>>>> 325cbd7cc673d2ebae3105fce8d34ffe61da45da
    screen: CategoriesScreen,
    navigationOptions: {
      tabBarLabel:'Categories',
      headerStyle: {
        backgroundColor: "white",
      },
    }},
<<<<<<< HEAD
  Home: { screen: HomeNavigator,
=======
  Home: { screen: HomeScreen,
>>>>>>> 325cbd7cc673d2ebae3105fce8d34ffe61da45da
    navigationOptions: {
      tabBarLabel:'Home'
    } },
  Search: { screen: SearchScreen,
    navigationOptions: {
      tabBarLabel:'Search',
      headerStyle: {
        backgroundColor: "white",
      },
    } },
  BrowseGrocery: { screen: BrowseGroceryScreen,
    navigationOptions: {
      tabBarLabel:'Browse'
    } },
  GroceryList: { screen: GroceryListScreen,
    navigationOptions: {
      tabBarLabel:'Grocery'
    } }
})
<<<<<<< HEAD
=======

>>>>>>> 325cbd7cc673d2ebae3105fce8d34ffe61da45da
const MainNavigator = StackNavigator({
   Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Checkout: {
    screen: CheckoutScreen,
  },
  Feedback: {
    screen: FeedbackScreen
  },
<<<<<<< HEAD
})
export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator />
      </View>
    );
  }
=======
  Try:{
    screen:Tabs
  }
})


export default class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator />
      </View>
    );
  }
>>>>>>> 325cbd7cc673d2ebae3105fce8d34ffe61da45da
}
// const screens = {
//   Login: {
//     screen: LoginScreen,
//   },
//   Register: {
//     screen: RegisterScreen,
//   },
//   BrowseGrocery: {
//     screen: BrowseGroceryScreen,
//   },
//   GroceryList: {
//     screen: GroceryListScreen,
//   },
//   Search: {
//     screen: SearchScreen,
//   },
//   Home: {
//     screen: HomeScreen,
//   },
//   Checkout: {
//     screen: CheckoutScreen,
//   },
//   Feedback: {
//     screen: FeedbackScreen
//   },
//   Categories: {
//     screen: CategoriesScreen
//   }
// }
<<<<<<< HEAD
=======




>>>>>>> 325cbd7cc673d2ebae3105fce8d34ffe61da45da
// const Home = StackNavigator(screens, {initialRouteName: 'Home'} )
// const Search = StackNavigator(screens,{initialRouteName: 'Search'} )
// const BrowseGrocery = StackNavigator(screens, {initialRouteName: 'BrowseGrocery'})
// const GroceryList = StackNavigator(screens, {initialRouteName: 'GroceryList'})
// const Categories = StackNavigator(screens, {initialRouteName: 'Categories'})
<<<<<<< HEAD
=======





>>>>>>> 325cbd7cc673d2ebae3105fce8d34ffe61da45da
// export default TabNavigator(
//   {
//     Categories: { screen: Categories },
//     Home: { screen: HomeScreen },
//     Search: { screen: Search },
//     BrowseGrocery: { screen: BrowseGrocery },
//     GroceryList: { screen: GroceryList }
<<<<<<< HEAD
=======


>>>>>>> 325cbd7cc673d2ebae3105fce8d34ffe61da45da
//   },
//   {
//     // navigationOptions: ({ navigation }) => ({
//     //   tabBarIcon: ({ focused, tintColor }) => {
//     //     const { routeName } = navigation.state;
//     //     let iconName;
//     //     if (routeName === 'Home') {
//     //       iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//     //     } else if (routeName === 'Search') {
//     //       iconName = `ios-options${focused ? '' : '-outline'}`;
//     //     }
//     //     else if (routeName === 'BrowseGrocery') {
//     //       iconName = `ios-options${focused ? '' : '-outline'}`;
//     //     }
//     //     else if (routeName === 'GroceryList') {
//     //       iconName = `ios-options${focused ? '' : '-outline'}`;
//     //     }
//     //
//     //
//     //     // You can return any component that you like here! We usually use an
//     //     // icon component from react-native-vector-icons
//     //     return <Ionicons name={iconName} size={25} color={tintColor} />;
//     //   },
//     // }),
//     // tabBarComponent: TabBarBottom,
//     // tabBarPosition: 'bottom',
//     // tabBarOptions: {
//     //   activeTintColor: 'tomato',
//     //   inactiveTintColor: 'gray',
//     // },
//     // animationEnabled: true,
//     // swipeEnabled: false,
//     order: ['Categories', 'Search', 'BrowseGrocery','GroceryList','Home']
//   }
// );
