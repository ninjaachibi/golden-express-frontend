//Styles
import {
  StyleSheet,
  Dimensions,
  Text,
  Platform
} from 'react-native';
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
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
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerResult:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderBottomWidth:0.25,
    borderBottomColor:'grey',
    overflow: 'hidden',
    height: 90,
    justifyContent: 'flex-start'
  },
  headerProduct:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    overflow: 'hidden',
    height: 90,
    justifyContent: 'flex-start'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    justifyContent: 'flex-start'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  backgroundView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
  },
  front: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 0 : 38,
    paddingTop: 87.5,
    height: 55,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',


    top: 0,
    left: 0,
    right: 0,
  },
  behind: {
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 0 : 38,
    paddingTop: 87.5,
    height: 55,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',


    top: 0,
    left: 0,
    right: 0,
  },
  bottom: {
    backgroundColor: '#edf0f4',
    height: 60,
    paddingBottom: 115,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'absolute',
    zIndex: 1,
    top: SCREEN_HEIGHT * 9/10,
    left: 0,
    right: 0,
  },
  wrapper: {
    backgroundColor: 'white',
    marginTop: 15,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  right: {
    backgroundColor: 'white',
    paddingTop: 75,
    marginTop: Platform.OS === 'ios' ? 0 : 38,
    height: 55,
    alignItems: 'flex-end',
    marginRight:12,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  center: {
    backgroundColor: 'transparent',
    paddingTop: 75,

    marginTop: Platform.OS === 'ios' ? 0 : 38,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 240,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoppingCartItem:{
    textAlign:'left',
    fontSize: 20
  },
  singleCardBox:{
    flexDirection:"row",
    justifyContent: 'space-between',
  },
  addAndRemoveBox:{
    // flexDirection:'row',
    // alignItems:'flex-end',
    //flexWrap:'wrap'
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
  checkOutTitle1:{
    fontSize:20,
    fontFamily:'Avenir',
    marginTop:15
  },
  paymentBox:{
    flexDirection:'row',
    alignItems:'flex-end',
    flexWrap:'wrap',
    marginTop:10,
    marginBottom: 5,
  },
  inputLabels:{
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    flexWrap:'wrap',
    position:'absolute',
    top:13,
    left:6,
    right:0,
  }
});


export default styles;
