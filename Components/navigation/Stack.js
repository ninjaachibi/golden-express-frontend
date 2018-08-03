import { StackNavigator } from 'react-navigation';
import RegisterScreen from '../RegisterScreen'
import LoginScreen from '../LoginScreen'
import HomeScreen from '../HomeScreen'
import ResultScreen from '../ResultScreen'
import GroceryListScreen from '../GroceryListScreen'
import SearchScreen from '../SearchScreen'
import CheckoutScreen from '../CheckoutScreen'
import FeedbackScreen from '../FeedbackScreen'

const Stack = StackNavigator({

    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Result: {
      screen: ResultScreen,
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
    Checkout: {
      screen: CheckoutScreen,
    },
    Feedback: {
      screen: FeedbackScreen
    }
  }, {initialRouteName: 'Feedback'});

  export default Stack
