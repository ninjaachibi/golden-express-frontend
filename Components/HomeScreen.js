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
  Dimensions,
  ActivityIndicator
} from 'react-native';
 // Version can be specified in package.json
import HorizontalMealScroll from './HorizontalMealScroll';
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon, List, ListItem} from 'react-native-elements';
import styles from './Styles'
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const HEADER_MAX_HEIGHT = 100//240;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const B_IMG = require('../assets/White.png')
const G_IMG = require('../assets/Nature.jpg')
const D_IMG = require('../assets/goldenTemple.jpg')
const L_IMG = require('../assets/White.png')
const A_IMG = require('../assets/White.png')



export default class HomeScreen extends React.Component {

  cartNavigate()
  {
    this.props.screenProps.cart()

  }

  openDrawer()
  {
    this.props.screenProps.openDrawer()
  }

  static navigationOptions =({navigation}) => {
    const {state} = navigation
    return {
    header:null
    }

  };

  constructor(props)
  {
    super(props)
    this.state = {
      search:"",
      meals: [],
      searchBar: false,
      message:'',
      search: '',
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      isReady: false,
    }
    this.searchBar = this.searchBar.bind(this)
    this.browseAisle = this.browseAisle.bind(this)
    this.openProduct = this.openProduct.bind(this)


  }


  //run the coponoennt and have it fetch the data
  //each ingredient has i\ts own page that displays what it looks like
  //how to make an image, where do i source
  //user gives quantities
  //algo updates quantiies with respect to recipe and user's desires
  submit() {
    console.log('clicked search');
    this.setState({searchBar:!this.state.searchBar})
    this.props.navigation.navigate('BrowseGrocery', {
      query: this.state.search,
    });
  }

  browseAisle (aisle) {
    console.log('clicked');
    fetch('https://golden-express.herokuapp.com/browse' + `?aisle=${aisle.toLowerCase()}`)
    .then((resp) => resp.json())
    .then(resp => {
      console.log('hitting',resp);
      this.props.navigation.navigate({key:'HomeResults', routeName:'HomeResults', params: {groceryItems: resp.items, aisle: aisle}})
    })
    .then(res => this.setState({disabled:false}))
  }

  createAisle(aisle){
    return (
      <View style={[styles.row]}>
        <ImageBackground style={{width:SCREEN_WIDTH* 1.25, height: 275, justifyContent:'flex-start',position:'absolute', top: 25, left:-20, right:50 }} source={A_IMG}>
          <TouchableOpacity onPress={()=> this.browseAisle(aisle)} style={{position:'absolute', top: 12, left: SCREEN_WIDTH*3/4, zIndex:3}}>
          <Text style={{color:'#E15252',marginTop:2,marginRight:10, fontWeight:'bold',fontSize:16}}>View more...></Text>
        </TouchableOpacity>
        <HorizontalMealScroll openProduct={this.openProduct} aisle={aisle} style={{flex:1}}/>
      </ImageBackground>
    </View>
  )}



  componentDidMount() {
    setTimeout(()=>{
      this.setState({isReady: true})
    }, 3000)
  }

  openProduct(item){
    this.props.screenProps.openProduct(item)
  }

  press() {
    this.props.navigation.navigate('Search')
  }

  searchBar(){
    this.props.navigation.navigate('HomeSearch')
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

    if(!this.state.isReady) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
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
            <View style={[styles.scrollViewContent]}>


        <View style={[styles.row,{backgroundColor:'transparent', alignItems:'center', justifyContent:'center'}]}>
          {/* <TouchableHighlight onPress={()=>this.props.navigation.navigate('HomeSearch')}> */}
          <TouchableOpacity
            style={{height: 40, width: SCREEN_WIDTH , alignItems:'center', backgroundColor:'transparent',
            borderRadius: 8, padding:3, justifyContent:'center', position:'absolute', top: 130,  left:0, right: 0,zIndex:3 }}
            placeholder="Search for a Recipe"
            onPress={()=>{console.log("Pressed");this.props.navigation.navigate({key:'HomeSearch', routeName: 'HomeSearch'})}
          }>
          </TouchableOpacity>
          {/* <ImageBackground style={{width:SCREEN_WIDTH* 1.25, height: 275, justifyContent:'center',position:'absolute', top: 25, left:-SCREEN_WIDTH*1/10, right:0}} source={B_IMG}>
          <Image
            source={L_IMG}
            style={{height:140, width: 180, borderRadius: 14, position:'absolute', top:65,left:SCREEN_WIDTH*1/10, right:0, marginBottom: 14, marginLeft: 75}}/>
          </ImageBackground> */}
        </View>
          <View
            style={{flex:1, backgroundColor:'white', alignItems:'flex-start'}}
          >
            {
              this.createAisle('meat')
            }
            <View style={{height:SCREEN_HEIGHT*1/11, backgroundColor:'transparent'}}/>
            {
              this.createAisle('seafood')
            }
            <View style={{height:SCREEN_HEIGHT*1/11, backgroundColor:'transparent'}}/>

            {
              this.createAisle('spices')
            }
            <View style={{height:SCREEN_HEIGHT*1/11, backgroundColor:'transparent'}}/>

            {
              this.createAisle('produce')
            }
            <View style={{height:SCREEN_HEIGHT*1/11, backgroundColor:'transparent'}}/>

            {
              this.createAisle('snacks')
            }
            <View style={{height:SCREEN_HEIGHT*1/11, backgroundColor:'transparent'}}/>

            {
              this.createAisle('noodles')
            }
            <View style={{height:SCREEN_HEIGHT*1/11, backgroundColor:'transparent'}}/>

            {
              this.createAisle('beverage')
            }
            <View style={{height:SCREEN_HEIGHT*1/9, backgroundColor:'transparent'}}/>


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
            styles.header,
            { opacity:imageOpacity,transform: [{ translateY: headerTranslate }] },
          ]}
          >

           <Animated.Image
             source={G_IMG}
             style={[styles.backgroundImage, {
               opacity: imageOpacity,
               transform: [{ translateY: imageTranslate }]


             }]}/>
             <TouchableOpacity
               style={{height: 40, width: SCREEN_WIDTH * 9/10, alignItems:'center', backgroundColor:'white',
               borderRadius: 5, padding:3, justifyContent:'center', position:'absolute', top: 245, zIndex:3 }}
               placeholder="Search for a Recipe"
               onPress={()=>{console.log("Pressed");this.props.navigation.navigate('HomeSearch')}
             }>
             <Text style={{color:'#D1CFCF'}}> Search Golden Express </Text>

             {/* <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.submit()} }>
             <Text style={styles.buttonLabel}>Search</Text>
           </TouchableOpacity> */}
           {/* </View> */}
         </TouchableOpacity>






       </Animated.View>


       <Animated.View
          style={[
            styles.behind,
            {
              opacity: imageOpacity1,

              transform: [
                { translateY: titleTranslate },
                  {scale: titleScale }
              ],
            },
          ]}
        >
          <View style={{marginTop:-25,marginLeft: 15}}>

        <TouchableOpacity style={{marginTop:-31.5,marginLeft:-1}} onPress={() => this.openDrawer()}>
          <Icon
                 name='account-circle'
                 size={35}
                 color={'yellow'}
                 underlayColor={'white'}

               />
             </TouchableOpacity>
           </View>

             <View style={{marginTop:-25,marginLeft: SCREEN_WIDTH/2-25}}>
            <Text style={{fontSize:21, fontWeight:'bold', color:'blue',marginTop:-5}}>Home</Text>
          </View>

          <View style={{marginTop:-25,marginLeft: 30}}>


          <TouchableOpacity style={{marginLeft:SCREEN_WIDTH - 68, marginTop:34}}>
              <Icon
              name='shopping-cart'
              color='blue'
              onPress={()=>{this.props.screenProps.cart()}}/>
            </TouchableOpacity>
          </View>

        </Animated.View>
        <Animated.View
           style={[
             styles.front,
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

         <TouchableOpacity style={{marginTop:-31.5,marginLeft:-1}} onPress={() => this.openDrawer()}>
           <Icon
                  name='account-circle'
                  size={35}
                  color={'red'}
                  underlayColor={'transparent'}

                />
              </TouchableOpacity>
            </View>

              <View style={{marginTop:-25,marginLeft: SCREEN_WIDTH/2-25}}>
             <Text style={{fontSize:21, fontWeight:'bold', color:'red',marginTop:-5}}>Home</Text>
           </View>

           <View style={{marginTop:-25,marginLeft: 30}}>


           <TouchableOpacity style={{marginLeft:SCREEN_WIDTH - 68, marginTop:34}}>
               <Icon
               name='shopping-cart'
               color='red'
               onPress={()=>{this.props.screenProps.cart()}}/>
             </TouchableOpacity>
           </View>

         </Animated.View>

</View>

    )
  }
}
// ['rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 255)']
