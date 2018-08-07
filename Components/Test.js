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
  ScrollView,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import styles from './Styles'
import HorizontalMealScroll from './HorizontalMealScroll'
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon} from 'react-native-elements';
const D_IMG = require('../assets/goldenTemple.jpg')

class SearchScreen extends React.Component {
  static navigationOptions =({navigation}) => {
    const {state} = navigation
    return {

    headerTitle: <Text style={{fontSize:18,fontWeight:'bold'}}> Search </Text>,

    }

  };


  constructor(props) {
    super(props);
    this.state = {
      message: '',
      search: '',
    }
  }



  render() {
    let navigation = this.props.navigation;

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems:'center',
        justifyContent:'center'
      }}>

      <Text> Lets test button functionality on screen </Text>
    


  </View>
    )
  }
}

export default SearchScreen;
