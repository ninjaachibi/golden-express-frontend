import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button
} from 'react-native';
import styles from './Styles'

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


class FeedbackScreen extends React.Component {
  static navigationOptions ={
    title: 'Feedback'
  };

  constructor() {
    super();
    this.state = {
      message:''
    }
  }

  press() {
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.message}</Text>

      </View>
    )
  }
}

export default FeedbackScreen;
