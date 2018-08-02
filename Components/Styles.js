//Styles
import {
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  goldenImage: {
  flex: 1,
  top: 0,
  left: 0,
  width:SCREEN_WIDTH,
  justifyContent: 'center',
  alignItems: 'stretch',
  opacity: 0.8
},

  bgImage: {
  flex: 1,
  top: 0,
  left: 0,
  width:SCREEN_WIDTH,
  height:SCREEN_HEIGHT,
  justifyContent: 'center',
  alignItems: 'center'
},
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Didot',
    color:'white',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    marginLeft: 55,
    marginRight: 55,
    borderRadius: 10
  },
  inputContainer:{
    borderBottomWidth:0.4,
    borderColor:'white',
    height: 30,
    width:180,
    justifyContent: 'center',
    alignItems: 'stretch',
    textAlign:'center'
  },
  Logininput:{
    height: 40,
    color:'white'
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: 'transparent',
    borderColor:'white',
    borderBottomWidth:0.7,
    borderTopWidth:0.7,
    borderLeftWidth:0.7,
    borderRightWidth:0.7,
    borderColor:'white',

  },
  buttonGreen: {
    backgroundColor: '#3aa575',
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});

export default styles;
