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
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import styles from './Styles'
import { Input, Button, Icon, CheckBox, Card } from 'react-native-elements'
const SCREEN_WIDTH = Dimensions.get('window').width
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)
const BG_IMG = require('../assets/Register.jpg')
const TOSurl = 'https://drive.google.com/file/d/1NuDxs8N-XNTcz8oqEq5H7-ZFdBymkRXo/view'

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message:'',
      checked:false
    }

  this.openTOSURL=this.openTOSURL.bind(this)
  }
  static navigationOptions = {
    header: null
  };

  openTOSURL(){
    Linking.openURL(TOSurl).catch(err => console.error('An error occurred', err));
  }
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
              <View style={{position:'absolute',top: 48, left:0,right:SCREEN_WIDTH * 9/10}}>
          <Icon
            name={'chevron-left'}
            size={45}
            color={'white'}
            onPress={()=>this.props.navigation.goBack()}
            underlayColor={'transparent'}
          />
        </View>

        <Text>{this.state.message}</Text>

        <Text style={styles.textBig}>Register</Text>
        <Text style={{fontSize:18, marginTop:10,fontWeight:'bold', color:'white'}}>Fill the form out fully in order to register</Text>

        <TextInput
          style={{height: 50, color: 'white', fontSize:15}}
          placeholder="Enter your username..."
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({username: text})}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={{height: 50, color: 'rgba(255,255,255,1)', fontSize: 15}}
          placeholderTextColor='rgba(255,255,255,1)'
          placeholder="Enter your password..."
          onChangeText={(text) => this.setState({password: text})}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={{height: 50, color: 'rgba(255,255,255,1)', fontSize: 15}}
          placeholderTextColor='rgba(255,255,255,1)'
          placeholder="Phone Number..."
          onChangeText={(text) => this.setState({phone: text})}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={{textAlign:'left',height: 50, color: 'rgba(255,255,255,1)', fontSize: 15}}
          placeholderTextColor='rgba(255,255,255,1)'
          placeholder="Enter your email..."
          onChangeText={(text) => this.setState({email: text})}
          autoCorrect={false}
          autoCapitalize='none'
        />
        {username && password && email && phone ?
          <View>
          <TouchableOpacity style={[styles.button2, styles.buttonBlue]} onPress={ () => {this.register()} }>
            <Text style={styles.buttonLabel}>Register</Text>
          </TouchableOpacity>
          </View>
          :
          <View>

            <TouchableOpacity style={[styles.button2, styles.buttonDisabled]} disabled={true}>
              <Text style={styles.buttonLabel} borderColor='white' borderStyle='solid'>Register</Text>
            </TouchableOpacity>
          </View>




        }
        <View>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} style={[styles.button3,styles.buttonOrange]}>
          <Text style={styles.buttonLabel} borderColor='white' borderStyle='solid'>Go to Login Screen</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignSelf: 'stretch',
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: 20,
                    marginLeft: 55,
                    marginRight: 55,
                    borderRadius: 10}}>
      {/* <CheckBox
        center
        title='TOS'
        checked={this.state.checked}
        onPress={() => this.setState({checked: !this.state.checked})}
        /> */}
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            <Text style={{color: 'white'}}>By registering, I agree to the </Text>

            <TouchableOpacity onPress={this.openTOSURL}>
              <Text style={{color: 'blue'}}>TOS</Text>
            </TouchableOpacity>

            <Text style={{color: 'white'}}>of the Golden Express Beta</Text>
          </View>
      </View>

        <View style={{height:25}}/>


      </ImageBackground>
</KeyboardAvoidingView>
    )
  }
}

export default RegisterScreen;
