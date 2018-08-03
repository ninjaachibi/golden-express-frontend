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

import Stack from './Components/navigation/Stack.js'
import {createStore} from 'redux'
import { Provider } from 'react-redux'


const store = createStore(reducer)
export default class App extends Component{
  render(){
    return (

        <Stack />
     

    )
  }
}

