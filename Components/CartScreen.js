import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  Image,
  ScrollView,
  ImageBackground,
  AsyncStorage,
  Animated,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import _ from 'underscore'
import CartItem from './CartItem'
import { NavigationActions } from 'react-navigation';

 // Version can be specified in package.json
import HorizontalMealScroll from './HorizontalMealScroll'
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import {Header, Icon, List, ListItem, Card} from 'react-native-elements';
import styles from './Styles'
const HEADER_MAX_HEIGHT = 100//240;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const B_IMG = require('../assets/redGradient.png')
const G_IMG = require('../assets/redGradient.png')
const D_IMG = require('../assets/goldenTemple.jpg')
const L_IMG = require('../assets/Coupon.jpg')
const A_IMG = require('../assets/redGradient.png')
const list = [
  {route:'Account', icon:{name: 'user-circle', type: 'font-awesome', size:20}},
  {route: 'Order',icon:{name: 'file-text-o', type: 'font-awesome', size: 20}  }]






export default class CartScreen extends React.Component {




  static navigationOptions =({navigation}) => {
    const {state} = navigation
    return {
    header:null
    // headerRight: <TouchableOpacity style={{marginRight:10}}>
    //     <Icon
    //     name='shopping-cart'
    //     color='blue'
    //     onPress={()=>{state.params.cart()}}/>
    //   </TouchableOpacity>
    }

  };

  constructor(props)
  {
    super(props)
    this.state = {
      searchBar: false,
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,

    }
    this.addToCart = this.addToCart.bind(this);
    this.getItemTotal = this.getItemTotal.bind(this);
    this.subtractFromCart = this.subtractFromCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this)
    this.openProduct = this.openProduct.bind(this)


  }
  async componentDidMount () {
    // AsyncStorage.removeItem('cart', ()=>{console.log('removed iten')})
    let cart = await AsyncStorage.getItem('cart', () => {console.log('got cart')})

    if(!cart) {
      cart = "{}";
    }
    this.setState({cart:JSON.parse(cart)});
  }

  async addToCart (item, quantity) {
    try {
      let cart = await AsyncStorage.getItem('cart', (err,res)=> {if(err)console.log('err',err);});
      cart = JSON.parse(cart);
      console.log('cart is',cart);
      if(!cart) {
        cart = {}
      }
      cart[item._id] = !!cart[item._id] ? {count: quantity + cart[item._id].count, item} : {count: quantity, item};
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log("added to cart", cart);
      this.setState({cart:cart}); //this is the only line that's different between ProductScreen's addToCart
    }
    catch(err) {
      console.log(err);
    }
  }

  /* need to account for case where count is less than 1*/
  async subtractFromCart(item) {
    try {
      let cart = await AsyncStorage.getItem('cart', (err,res)=> {if(err)console.log('err',err);});
      cart = JSON.parse(cart);
      console.log('cart is',cart);
      if (!!cart[item._id] && cart[item._id].count > 0) {
        cart[item._id] = !!cart[item._id] ? { count: --cart[item._id].count, item } : { count: 1, item };
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        console.log("subtracted from cart", cart);
        this.setState({ cart:cart })
      }
      else {
        console.log('not subtracting from cart');
      }

    }
    catch(err) {
      console.log('error', err);
    }
  }

  async deleteFromCart (item) {
    try {
      let cart = await AsyncStorage.getItem('cart', (err,res)=> {if(err)console.log('err',err);});
      cart = JSON.parse(cart);
      console.log('cart is',cart);
      delete cart[item._id];
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log("deleted from cart", cart);
      this.setState({ cart })
    }
    catch (err) {
      console.log('error', err);
    }
  }

  checkout() {
    console.log('checking out');
    this.props.navigation.navigate('Checkout', {total: this.calculateTotal(), cart: this.state.cart})
  }

  openProduct(item){

    this.props.navigation.navigate({key:'Product',routeName:'Product', params:{item: item, addToCart: this.addToCart}})
  }

  calculateTotal () {
    let ret = _.values(this.state.cart).reduce((total, item) => total + this.getItemTotal(item), 0)
    return ret;
  }

  getItemTotal(item) {
    function stripLetters (string) {
      return string.replace(/\D/g,'');
    }

    let price = Number(stripLetters(item.item.price))
    let count = item.count;
    // console.log('price', price, typeof price)
    // console.log('count', count, typeof count);
    return price * count / 100;
  }



  //run the coponoennt and have it fetch the data
  //each ingredient has i\ts own page that displays what it looks like
  //how to make an image, where do i source
  //user gives quantities
  //algo updates quantiies with respect to recipe and user's desires




  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });
    const imageOpacity = this.state.scrollY.interpolate({
  inputRange: [0,  HEADER_SCROLL_DISTANCE / 6, HEADER_SCROLL_DISTANCE / 4,HEADER_SCROLL_DISTANCE / 2,HEADER_SCROLL_DISTANCE * 3 / 4,HEADER_SCROLL_DISTANCE * 7 / 8, HEADER_SCROLL_DISTANCE],
  outputRange: [1, 0.8, 0.7,0.5,0.4,0.25,0],
  extrapolate: 'clamp',
});
const imageOpacity1 = this.state.scrollY.interpolate({
inputRange: [0,  HEADER_SCROLL_DISTANCE / 6, HEADER_SCROLL_DISTANCE / 4,HEADER_SCROLL_DISTANCE / 2,HEADER_SCROLL_DISTANCE * 3 / 4,HEADER_SCROLL_DISTANCE * 7 / 8, HEADER_SCROLL_DISTANCE],
outputRange: [0, 0.25, 0.40,0.6,0.75,0.9,1],
extrapolate: 'clamp',
});
const imageTranslate = this.state.scrollY.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE/15,HEADER_SCROLL_DISTANCE/3,HEADER_SCROLL_DISTANCE],
  outputRange: [0, 50, 60, 100],
  extrapolate: 'clamp',
});

const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 0],
      extrapolate: 'clamp',
    });
    const colorTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ['rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 255)'],
      extrapolate: 'clamp',
    });


    console.log(this.state.scrollY)

    return (



      <View style={[styles.fill, {backgroundColor:'white'}]}>
        <StatusBar
         translucent
         barStyle="light-content"
         backgroundColor="rgba(0, 0, 0, 0.251)"
       />

          <Animated.ScrollView
             scrollEventThrottle={1}
            contentContainerStyle={{alignItems:'flex-start'}} style={{
            flex:12,
          }} scrollEnabled={true}
          enableEmptySections={true}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
          >
            <View style={[styles.scrollViewContent1]}>


              <View>
                { _.isEmpty(this.state.cart) ?
                  <View style={{position:'relative', zIndex:4,top:46, right:0,left:SCREEN_WIDTH*1/4, alignItems:'center'}}>
                  <MaterialCommunityIcons style={{marginBottom:30}} name={'cart-outline'} size={64} color={'grey'}/>
                    <Text style={{fontSize: 24, fontWeight:'bold'}}>Your cart is empty</Text>
                    <TouchableOpacity
                      onPress={()=>this.props.navigation.goBack(0)}
                      style={{borderRadius:6,alignItems:'center', justifyContent:'center',marginTop:28, width:SCREEN_WIDTH * 1/3, height:40, backgroundColor:'#d3cb52'}}>
                  <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Shop Now</Text>
                  </TouchableOpacity>

                  </View>
                  :
                  <View>
                    <View className="cart-container">
                      {
                        _.values(this.state.cart).map((item) => {
                          return (
                              <CartItem
                                key = {item.item._id}
                                item={item}
                                addToCart={this.addToCart}
                                subtractFromCart={this.subtractFromCart}
                                deleteFromCart={this.deleteFromCart}
                                getTotal={this.getItemTotal}
                                openProduct={this.openProduct}
                              />

                          )
                        })
                      }
                    </View>

                  </View>
                }

              </View>
              <View style={{height:90}}/>
        </View>

        </Animated.ScrollView>

        {/* <Animated.View style={styles.header}>
  <View style={styles.bar}>
    <Text style={styles.title}>Title</Text>
  </View>
</Animated.View> */}
<Animated.View
          pointerEvents="none"
          style={[
            styles.header2,
            { opacity:imageOpacity,transform: [{ translateY: headerTranslate }] },
          ]}
        >







       </Animated.View>


       <Animated.View
          style={[
            styles.behind,
            {

              transform: [
                { translateY: titleTranslate },
                  {scale: titleScale }
              ],
            },
          ]}
        >
         <View style={{position:'absolute', top:86, left:0,right: SCREEN_WIDTH*7/8}}>

        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginTop:-31.5,marginLeft:8}} >
          <Entypo
                 name='cross'
                 size={28}
                 color={'red'}
                 underlayColor={'white'}

               />
             </TouchableOpacity>
           </View>

           <View style={{position:'absolute', top:64,left:SCREEN_WIDTH*4/10,right:0}}>
          <Text style={{fontSize:19, fontWeight:'bold', color:'red',marginTop:-5}}>My Cart</Text>
        </View>

          <View style={{marginTop:-25,marginLeft: 30}}>



          </View>

        </Animated.View>
        <Animated.View
           style={[
             styles.front,
             {

               transform: [
                 { translateY: titleTranslate },
                   {scale: titleScale }
               ],
             },
           ]}
         >
           <View style={{position:'absolute', top:86, left:0,right: SCREEN_WIDTH*7/8}}>

         <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginTop:-31.5,marginLeft:8}}>
           <Entypo
                  name='cross'
                  size={28}
                  color={'red'}
                  underlayColor={'white'}

                />
              </TouchableOpacity>
            </View>

              <View style={{position:'absolute', top:64,left:SCREEN_WIDTH*4/10,right:0}}>
             <Text style={{fontSize:19, fontWeight:'bold', color:'red',marginTop:-5}}>My Cart</Text>
           </View>

           <View style={{marginTop:-25,marginLeft: 30}}>



           </View>

         </Animated.View>
         <Animated.View
           style={[
             styles.bottom,
             {

               transform: [
                 { translateY: titleTranslate },
                 {scale: titleScale }
               ],
             },
           ]}
           >

             <View style={{flexDirection:'row'}}>
               <Card borderRadius={8} containerStyle={{height: 24,position:'absolute', top:-13,left:0, right:0, flexDirection:'row', alignItems:'flex-start', backgroundColor:'white', borderColor:'grey',marginLeft:6,width: SCREEN_WIDTH * 0.48}}>

                 <Text  adjustsFontSizeToFit
              numberOfLines={1}
              allowFontScaling
              style={{height:26,position:'absolue', top:-14,left:15,right:0,fontWeight:'bold'}}> Total: ${this.calculateTotal().toFixed(2)}</Text>


               </Card>
               {_.isEmpty(this.state.cart) ?
                 <TouchableOpacity
                   style={{
                     alignItems:'center',
                     borderRadius: 8,
                     height:30,
                     position:'absolute',
                     top:2,
                     left:SCREEN_WIDTH*15/29,
                     right:0,
                     zIndex:2,
                     marginLeft:-2.5,
                     flexDirection:'row',
                     width: SCREEN_WIDTH * 0.48,
                     backgroundColor:'grey',
                     borderColor:'grey',
                     marginRight:5,
                     opacity:0.77,
                   }}
                   onPress={()=>{this.checkout()}}
                   disabled={true}
                 >
                   <Text style={{marginLeft: 40,textAlign:'right',color: 'white', fontSize: 18, fontWeight:'bold'}}> Checkout </Text>
                 </TouchableOpacity>
                 :
                 <TouchableOpacity
                   style={{
                     alignItems:'center',
                     borderRadius: 8,
                     height:30,
                     position:'absolute',
                     top:2,
                     left:SCREEN_WIDTH*15/29,
                     right:0,
                     zIndex:2,
                     marginLeft:-2.5,
                     flexDirection:'row',
                     width: SCREEN_WIDTH * 0.48,
                     backgroundColor:'red',
                     borderColor:'grey',
                     marginRight:5
                   }}
                 onPress={()=>{this.checkout()}}
                 >
                   <Text style={{marginLeft: 40,textAlign:'right',color: 'white', fontSize: 18, fontWeight:'bold'}}> Checkout! </Text>
                 </TouchableOpacity>
               }

             </View>



         </Animated.View>

</View>

    )
  }
}
// ['rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 255)']
