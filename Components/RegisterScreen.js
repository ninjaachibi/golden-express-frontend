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
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import styles from './Styles'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)
const BG_IMG = require('../assets/Register.jpg')


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
        phone: this.state.phone,
        email: this.state.email,
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
    let {username, password, phone, email} = this.state;
    return (
      <KeyboardAvoidingView style={[styles.container,{flex: 1, alignItems: 'stretch', position:'absolute', top:0,bottom:0,left:0,right:0}]} behavior="padding" enabled>
        <ImageBackground
            source={BG_IMG}
            style={[styles.bgImage,{opacity:0.75}]}
            >

        <Text>{this.state.message}</Text>

        <Text style={styles.textBig}>Register</Text>
        <TextInput
          style={{height: 50, color: 'white', fontSize:15}}

          placeholder="Enter your username..."
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({username: text})}
        />
        <TextInput
          style={{height: 50, color: 'rgba(255,255,255,1)', fontSize: 15}}
          placeholderTextColor='rgba(255,255,255,1)'
          placeholder="Enter your password..."
          onChangeText={(text) => this.setState({password: text})}
        />
        <TextInput
          style={{height: 50, color: 'rgba(255,255,255,1)', fontSize: 15}}
          placeholderTextColor='rgba(255,255,255,1)'
          placeholder="Phone Number..."
          onChangeText={(text) => this.setState({phone: text})}
        />
        <TextInput
          style={{textAlign:'left',height: 50, color: 'rgba(255,255,255,1)', fontSize: 15}}
          placeholderTextColor='rgba(255,255,255,1)'
          placeholder="Enter your email..."
          onChangeText={(text) => this.setState({email: text})}
        />
        {username && password && email && phone ?
          <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
            <Text style={styles.buttonLabel}>Register</Text>
          </TouchableOpacity>
          :
          <View>
            <TouchableOpacity style={[styles.button, styles.buttonDisabled]} disabled={true}>
              <Text style={styles.buttonLabel} borderColor='white' borderStyle='solid'>Register</Text>
            </TouchableOpacity>
            <Text style={{marginTop:10,fontWeight:'bold', color:'white'}}>Fill the form out fully in order to register</Text>

          </View>
        }

        <View style={{height:40}}/>


      </ImageBackground>
</KeyboardAvoidingView>
    )
  }
}

export default RegisterScreen;
