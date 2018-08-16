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
  AsyncStorage,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import styles from './Styles';
import {Input,Icon} from 'react-native-elements';
const BG_IMG = require('../assets/Login.jpg')


class LoginScreen extends React.Component {
  static navigationOptions ={
    title: 'Login'
  };

  constructor() {
    super();
    this.state = {
      message:''
    }
  }

  async componentDidMount() {
   await AsyncStorage.removeItem('token', (err, token)=> {
     console.log('removed token', token)}); //logout

    let token;
    await AsyncStorage.getItem('token', (err, t)=> {
      token = t;
      console.log('got token', token);
    });
    if (token) {
      this.props.navigation.navigate('Drawer')//for debugging
    }

  }

  press() {
    fetch('https://golden-express.herokuapp.com/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
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
      if (responseJson.success) {
        AsyncStorage.setItem('token',responseJson.token)
        this.props.navigation.navigate('Drawer')//for debugging
      }
      else {
        this.setState({message: `Error: ${responseJson.message}`})
      }
    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log('error', err)
      this.setState({message: err})
    });

  }

  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <KeyboardAvoidingView style={[styles.container,{flex: 1, alignItems: 'stretch', position:'absolute', top:0,bottom:0,left:0,right:0}]} behavior="padding" enabled>
        <ImageBackground
            source={BG_IMG}
            style={[styles.bgImage, {opacity:0.75}]}
            >
        <Text>{this.state.message}</Text>

        <Text style={[styles.textBig,{color:'white'}]}>WELCOME TO BETA</Text>
        <Text style={[styles.welcome, {color:'#ea4a41', fontWeight:'bold'}]}>If you have any questions/problems, call (214)475-9824</Text>
        <View style={styles.inputContainer}>
         <TextInput
          style={styles.Logininput}
          placeholder="Username"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({username: text})}
          autoCorrect={false}
          autoCapitalize='none'
        />
       </View>
       <View style={styles.inputContainer}>
        <TextInput
          style={styles.Logininput}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor='white'
          borderColor='white'
          borderStyle='solid'
          onChangeText={(text) => this.setState({password: text})}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </View>
        <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel} borderColor='white'
          borderStyle='solid'>Register</Text>
        </TouchableOpacity>
      </ImageBackground>
</KeyboardAvoidingView>    )
  }
}

export default LoginScreen;
