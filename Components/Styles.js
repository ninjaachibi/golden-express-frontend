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
    fontSize: 44,
    textAlign: 'center',
    fontFamily: 'Didot',
    color:'rgba(255,255,255,0.89)',
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
  },
  Logininput:{
    height: 40,
    color:'white'
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: 'orange',
    opacity:0.77,
    borderColor:'#f9ce84',
    borderBottomWidth:0.7,
    borderTopWidth:0.7,
    borderLeftWidth:0.7,
    borderRightWidth:0.7,

  },
  buttonGreen: {
    backgroundColor: '#3aa575',
    opacity: 0.77
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  shoppingCartItem:{
    textAlign:'left',
    fontSize: 20
  },
  singleCardBox:{
    flexDirection:"row",
    justifyContent: 'space-between'
  },
  addAndRemoveBox:{
    flexDirection:'row', 
    alignItems:'flex-end', 
    flexWrap:'wrap'
  },
  itemQuan:{
    fontSize:20,
    marginTop:7.5,
    marginLeft:3.45,
    marginRight:2.7
  },
  totalPrice:{
    fontSize:28,
    textAlign:"right",
    marginRight:20  
  },
  checkOutTitle:{
    fontSize:25,
    fontWeight:'bold',
    marginTop:15
  },
  paymentBox:{
    flexDirection:'row', 
    alignItems:'flex-end', 
    flexWrap:'wrap',
    marginTop:10
  },
});


export default styles;
