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
  Platform
} from 'react-native';
import styles from './Styles';
import {Header, Icon, Card} from 'react-native-elements';
import groceryItems from '../public/Inventory/Fresh_Meat'
import { Ionicons } from '@expo/vector-icons';
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const HEADER_MAX_HEIGHT = 30;//240;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const MEAT = {cat: 'Meat', src: require('../assets/Meat.png')}
const PRODUCE = {cat: 'Produce', src: require('../assets/Produce.png')}
const SEAFOOD = {cat: 'Seafood', src: require('../assets/Seafood.png')}
const DAIRY = {cat: 'Dairy', src: require('../assets/Dairy.png')}
const FROZEN = {cat: 'Frozen', src: require('../assets/Frozen.png')}
const PRESERVED = {cat: 'Preserved', src: require('../assets/Preserved.png')}
const BEVERAGES = {cat: 'Beverage', src: require('../assets/Beverages.png')}
const SNACKS = {cat: 'Snacks', src: require('../assets/Snacks.png')}
const NOODLES = {cat: 'Noodles', src: require('../assets/Noodles.png')}
const SPICES = {cat: 'Spices', src: require('../assets/Spices.png')}


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
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,

    }
  }

  componentDidMount() {
    console.log("I have reached the Product Screen");
    let item = this.props.navigation.getParam("item", "item")
    console.log(item)
    this.setState({item:item, image: item.imgURI, price: item.price, description: item.description, aisle:item.aisle, name:item.name})

  }



  createCategory (cat1,cat2) {
    return  (
      <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity activeOpacity={0.75} >
          <Image source={cat1.src} style={{height: 170,width: 170, marginLeft: 12, marginRight: 5, marginTop: 10,flex: 1}}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} >
          <Image source={cat2.src} style={{height: 170,width: 170, marginRight: 12, marginLeft:5, marginTop: 10,flex: 1}}/>
        </TouchableOpacity>
      </View>
    )
  }

  async addToCart (item) {
    // console.log('adding to cart', item);
    try {
      let cart = await AsyncStorage.getItem('cart', (err,res)=> {if(err)console.log('err',err);});
      cart = JSON.parse(cart);
      console.log('cart is',cart);
      if(!cart) {
        cart = {}
      }
        cart[item._id] = !!cart[item._id] ? {count: ++cart[item._id].count, item} : {count: 1, item};
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        console.log("added to cart", cart);
    }
    catch(err) {
      console.log(err);
    }
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

    const {name,price,image,description, aisle} = this.state

    return (
      <View style={[styles.fill]}>
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

            <View style={[styles.scrollViewContent, {marginTop: 105, width: SCREEN_WIDTH}]}>
              <View style={{alignItems:'center'}}>
              <Image source={{uri:image}} style={{borderRadius: 4,height:SCREEN_HEIGHT*1/6, width:SCREEN_WIDTH * 1/2}}/>
            </View>

            <View style={{alignItems:'flex-start', marginLeft: 16, marginTop:47}}>
              <Text style={{fontSize:18, fontWeight:"bold"}}>{name}</Text>
              <Text style={{fontSize:15, fontWeight:"bold", marginTop: 18}}>{price}</Text>


            </View>

            <Icon
              name="chevron-left"
              size={30}
              color={'green'}
              onPress={()=>this.addToCart(this.state.item)}
            />





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

          <View style={{marginTop:-25,marginLeft: 30}}>


          <TouchableOpacity style={{marginLeft:SCREEN_WIDTH - 64, marginTop:33}}>
              <Icon
              name='shopping-cart'
              color='blue'
              onPress={()=>{this.props.screenProps.cart()}}/>
            </TouchableOpacity>
          </View>

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
           <View style={{marginTop:-25,marginLeft: 15}}>

         <TouchableOpacity style={{marginTop:-31.5,marginLeft:-1}} onPress={() => this.props.navigation.goBack()}>
           <Card>
           <Icon
                  name='chevron-left'
                  size={35}
                  color={'blue'}
                  underlayColor={'white'}

                />
              </Card>
              </TouchableOpacity>
            </View>

              <View style={{marginTop:-25,marginLeft: SCREEN_WIDTH*3/10}}>
             <Text style={{fontSize:8, fontWeight:'bold', color:'black'}}>{this.state.name}</Text>
           </View>

           <View style={{marginTop:-25,marginLeft: 30}}>


           <TouchableOpacity style={{marginLeft:SCREEN_WIDTH - 64, marginTop:33}}>
               <Icon
               name='shopping-cart'
               color='blue'
               onPress={()=>{this.props.screenProps.cart()}}/>
             </TouchableOpacity>
           </View>

         </Animated.View>



</View>

    )
}
}

export default ProductScreen;
