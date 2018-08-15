import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  UIManager,
  Dimensions,
  ImageBackground
} from 'react-native';
import styles from './Styles'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)
const BG_IMG = require('../assets/Register.png')


class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message:''
    }
  }
  static navigationOptions = {
    title: 'Register'
  };
  register() {
    fetch('https://golden-express.herokuapp.com/register', {
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
       if(responseJson.success) {
         this.props.navigation.navigate('Login')
       }
       else {
         this.setState({message: `Error: ${responseJson.message}`})
       }
    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log(err)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
            source={BG_IMG}
            style={[styles.bgImage,{opacity:0.75}]}
            >

        <Text>{this.state.message}</Text>

        <Text style={styles.textBig}>Register</Text>
        <TextInput
          style={{height: 50, color: 'white', fontSize:15}}

          placeholder="Enter your username"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({username: text})}
        />
        <TextInput
          style={{height: 50, color: 'rgba(255,255,255,0.89)', fontSize: 15}}
          placeholderTextColor='rgba(255,255,255,0.8)'
          placeholder="Enter your password"
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel}>Register</Text>
        </TouchableOpacity>
      </ImageBackground>
      </View>
    )
  }
}

export default RegisterScreen;
