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

class LoginScreen extends React.Component {
  static navigationOptions ={
    title: 'Login'
  };

  constructor() {
    super();
    this.state ={
      message:''
    }
  }

  press() {
    fetch('https://hohoho-backend.herokuapp.com/login', { //make this our own backend
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      /* do something with responseJson and go back to the Login view but
      * make sure to check for responseJson.success! */
      console.log(responseJson)
      if (responseJson.success)
      {
        this.props.navigation.navigate('Home')
      }

    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log(err)
      this.setState({message:err})
    });

  }

  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.message}</Text>

        <Text style={styles.textBig}>Welcome to Golden Express!</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Enter your username"
          onChangeText={(text) => this.setState({username: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter your password"
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel}>Tap to Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default LoginScreen;
