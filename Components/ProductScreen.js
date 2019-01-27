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
  RefreshControl,
  Image,
  ScrollView,
  AsyncStorage,
  TouchableHighlight,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
  ActivityIndicator
} from 'react-native';
import { AppLoading, Asset, Font } from 'expo';

import styles from './Styles';
import {Header, Icon, Card} from 'react-native-elements';
import groceryItems from '../public/Inventory/Fresh_Meat'
import { Ionicons } from '@expo/vector-icons';
import _ from 'underscore';
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const HEADER_MAX_HEIGHT = 30;//240;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

let addToCart;
let cartAdd;

// function cacheImage(image) {
//   return Image.prefetch(image);
// }

function cacheImages(images) {
  console.log('images',images);
  return images.map(image => {
    if (typeof image === 'string') {
      console.log('image is a string');
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class ProductScreen extends React.Component {
  //Location  Favorites,foods,home, history, search?
  static navigationOptions =({navigation}) => {
    const {state} = navigation
    return {
      header:null
    }
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      item: "",
      quantity: 1,
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      isReady: false,
    }
    this.add = this.add.bind(this)
    this.subtract = this.subtract.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this._loadAssetsAsync = this._loadAssetsAsync.bind(this);
  }

  add(){
    this.setState({quantity:this.state.quantity+1})
  }

  subtract(){
    this.state.quantity > 0 ? this.setState({quantity:this.state.quantity-1}):null
  }

  componentWillMount() {
    console.log("I have reached the Product Screen");
    let item = this.props.navigation.getParam("item", {name: "no item passed"})
    console.log(item)
    addToCart = this.props.navigation.getParam("addToCart", null)
    // cartAdd = (item, quantity) => {
    //   addToCart(item, quantity)
    //   _.debounce(this.props.navigation.goBack, 300)();
    // }

    console.log('item',item)
    console.log('add to cart', addToCart);
    this.setState({item:item, image: item.imgURI, price: item.price, description: item.description, aisle:item.aisle, name:item.name})
  }

  async addToCart (item, quantity) {
    // console.log('adding to cart', item);
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
      _.debounce(this.props.navigation.goBack, 300)();

    }
    catch(err) {
      console.log(err);
    }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      this.state.image
    ]);

    await Promise.all([...imageAssets]);
  }

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
      inputRange: [0,  HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1],
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

    console.log(this.state)
    console.log('isReady',this.state.isReady);
    console.log('image is', this.state.image);

    const {name,price,image,description, aisle,item} = this.state

    return (
      <View style={[styles.fill,{backgroundColor:'white'}]}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />

        <Animated.ScrollView
          scrollEventThrottle={1}
          style={{
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

            <View style={[styles.scrollViewContent,  {marginTop: 105, width: SCREEN_WIDTH}]}>
              <View style={{backgroundColor: 'white'}}>
                <View style={{alignItems:'center'}}>
                  {this.state.isReady ?
                    <Image source={{uri:image}} style={{borderRadius: 4,height:SCREEN_HEIGHT*1/6, width:SCREEN_WIDTH * 1/2}}/>
                    :
                    <View>
                      <Text>Loading</Text>
                      <AppLoading
                        startAsync={this._loadAssetsAsync}
                        onFinish={() => this.setState({ isReady: true })}
                        onError={console.warn}
                      />
                      <ActivityIndicator size="large" color="#0000ff" />

                    </View>
                  }
                </View>

                <View style={{alignItems:'flex-start', marginLeft: 16, marginTop:47}}>
                  <Text style={{fontSize:18, fontWeight:"bold"}}>{name}</Text>
                  <Text style={{fontSize:15, fontWeight:"bold", marginTop: 18}}>{price}</Text>
                </View>


              </View>
              <View style={{backgroundColor:'white'}}>

                <View style={{alignItems:'flex-start', marginTop: 20, marginLeft:16, marginRight:8,}}>

                  <Text style={{fontSize: 12}}>Description: {this.state.description}</Text>
                </View>
              </View>


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
          styles.headerProduct,
          { opacity:imageOpacity,transform: [{ translateY: headerTranslate }] },
        ]}
        >
        </Animated.View>


        <Animated.View
          style={[
            styles.behind,
            {
              opacity: imageOpacity,

              transform: [
                { translateY: titleTranslate },
                {scale: titleScale }
              ],
            },
          ]}
          >
            <View style={{marginTop:-25,marginLeft: 15}}>

              <TouchableOpacity style={{marginTop:-31.5,marginLeft:-1}} onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name='chevron-left'
                  size={35}
                  color={'blue'}
                  underlayColor={'white'}

                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop:-25,marginLeft: SCREEN_WIDTH*7/25, alignItem:'center'}}>
            <Text style={{fontSize:12, textAlign:'center', fontWeight:'bold', color:'black'}}>{this.state.name}</Text>
          </View>

          {/* <View style={{marginTop:-25,marginLeft: 30}}>


            <TouchableOpacity style={{ marginLeft:SCREEN_WIDTH - 64, marginTop:33 }}>
              <Icon
                name='shopping-cart'
                color='blue'
                onPress={()=>{this.props.screenProps.cart()}}
              />
            </TouchableOpacity>
            </View> */}

          </Animated.View>
          <Animated.View
            style={[
              styles.bottom,
              {
                opacity: imageOpacity,

                transform: [
                  { translateY: titleTranslate },
                  {scale: titleScale }
                ],
              },
            ]}
            >

              <View style={{flexDirection:'row'}}>
                <Card borderRadius={8} containerStyle={{height: 15,position:'absolute', top:-13,left:0, right:0, flexDirection:'row', alignItems:'flex-start', backgroundColor:'white', borderColor:'grey',marginLeft:6,width: SCREEN_WIDTH * 0.48}}>
                  <TouchableOpacity
                    style={{position:'absolute', top:-21,left:-10,right:SCREEN_WIDTH*1/3}}
                    onPress={() => this.subtract()}>
                    <Text style={{fontSize:32}}> - </Text>
                  </TouchableOpacity>
                  <Text style={{position:'absolue', top:-14,left:67,right:0, fontSize: 22, fontWeight:'bold'}}>{this.state.quantity}</Text>
                  <TouchableOpacity
                    style={{position:'absolute', top:-21,left:SCREEN_WIDTH*1/3,right:-10}}
                    onPress={() => this.add()}>
                    <Text style={{fontSize:32}}> + </Text>
                  </TouchableOpacity>

                </Card>
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
                onPress={()=> { addToCart ?
                  // cartAdd(item, this.state.quantity)
                  (function (item,quantity) {
                    addToCart(item,quantity)
                    _.debounce(this.props.navigation.goBack, 300)()
                  }.bind(this))(item,this.state.quantity)
                  :
                  this.addToCart(item, this.state.quantity);
                }}>
                  <Text style={{marginLeft: 40,textAlign:'right',color: 'white', fontSize: 18, fontWeight:'bold'}}> Add to Cart </Text>
                </TouchableOpacity>


              </View>


      </Animated.View>



    </View>

  )
}
}



export default ProductScreen;
