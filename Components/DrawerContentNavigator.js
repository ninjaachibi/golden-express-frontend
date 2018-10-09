import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  Image,
  ScrollView,
  ImageBackground,
  AsyncStorage,
  Animated,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';
import DrawerScreen from './Sidebar'
import OrderNavigator from './OrderNavigator'
 // Version can be specified in package.json
import ScoreNavigator from './ScoreNavigator'
import HorizontalMealScroll from './HorizontalMealScroll'
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon, List, ListItem} from 'react-native-elements';
import styles from './Styles'
const HEADER_MAX_HEIGHT = 100//240;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const B_IMG = require('../assets/redGradient.png')
const G_IMG = require('../assets/redGradient.png')
const D_IMG = require('../assets/goldenTemple.jpg')
const L_IMG = require('../assets/Vegetables.jpg')
const A_IMG = require('../assets/redGradient.png')
const list = [
  {route:'Account', name: 'Account Information',icon:{name: 'user-circle', type: 'font-awesome', size:20}},
{route:'Score', name: 'Scoreboard',icon:{name: 'user-circle', type: 'font-awesome', size:20,}}
  // {route: 'Help',icon:{name: 'file-text-o', type: 'font-awesome', size: 20}  }
]

export default class DrawerContentNavigator extends React.Component {

  constructor(props){
    super(props)
    this.state ={


    }
  }

  cartNavigate(){
    this.props.screenProps.cart()
  }
  openDrawer(){
    this.props.screenProps.openDrawer()
  }

  openContact(){
    this.props.screenProps.openContact()
  }
  //run the coponoennt and have it fetch the data
  //each ingredient has i\ts own page that displays what it looks like
  //how to make an image, where do i source
  //user gives quantities
  //algo updates quantiies with respect to recipe and user's desires
  navigateToScreen = (route) => () => {
      const navigate = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigate);
    }

render(){
  const stack = {
    Sidebar: {
      screen: DrawerScreen,
    },

    Score: {
      screen: ScoreNavigator
    },
    Order: {
      screen: OrderNavigator
    }
  }

  var DrawerContentStack = StackNavigator(stack, {initialRouteName: 'Sidebar',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  })
  return (
    <View style={{flex: 1}}>
      <DrawerContentStack
        screenProps={{
          cart: this.navigateCart,
          openProduct: this.openProduct,
          openContact: this.openContact
        }}/>
    </View>

  )


}
}
