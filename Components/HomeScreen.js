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
} from 'react-native';
 // Version can be specified in package.json
import HorizontalMealScroll from './HorizontalMealScroll'
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon} from 'react-native-elements';
import styles from './Styles'

const HEADER_MAX_HEIGHT = 80//240;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const G_IMG = require('../assets/goldenImage.jpg')
const D_IMG = require('../assets/goldenTemple.jpg')
const L_IMG = require('../assets/Coupon.jpg')


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

    }
    this.searchBar = this.searchBar.bind(this)


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




  componentDidMount() {
    //fetch meallist
    //display top Meals
    //fetch recommended meals
    //create alogirthm that displays certain meals
    const {setParams} = this.props.navigation;
    setParams({cart: this.props.screenProps.cart})
    AsyncStorage.getItem('meals')
      .then((data) => {
        console.log('meals from AsyncStorage', JSON.parse(data));
        this.setState({
          meals: JSON.parse(data)
        })
      })
      .catch(err => console.log('err',err))

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
inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
outputRange: [1, 0.75, 1],
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



      <View style={styles.fill}>
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


        <View style={{backgroundColor:'#F0EFF5', alignItems:'flex-start', justifyContent:'center'}}>
          <TouchableHighlight onPress={()=>this.openDrawer()}>

          <Image
            source={L_IMG}
            style={{height:190, width: 240, borderRadius: 14, marginTop: 130, marginBottom: 10, marginLeft: 75}}/></TouchableHighlight>
          </View>
          <View style={{flex:1,
            backgroundColor:'#e8ecf4',

            alignItems:'flex-start'}}>

            <HorizontalMealScroll style={{flex:1}}/>
            <HorizontalMealScroll style={{flex:1}}/>
            <HorizontalMealScroll style={{flex:1}}/>
            <HorizontalMealScroll style={{flex:1}}/>
            <HorizontalMealScroll style={{flex:1}}/>
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
             style={{height: 40, width:350, backgroundColor:'white', borderRadius: 20, margin: 10, marginTop: 102, padding:3,display:null, alignItems:'center', justifyContent:'center', }}
             placeholder="Search for a Recipe"
             onPress={()=>{console.log("Pressed");this.props.navigation.navigate('HomeSearch')}
           }>
           <Text style={{color:'grey'}}> Search Golden Express </Text>

           {/* <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.submit()} }>
           <Text style={styles.buttonLabel}>Search</Text>
         </TouchableOpacity> */}
         {/* </View> */}
       </TouchableOpacity>



       </Animated.View>

       <Animated.View
          style={[
            styles.left,
            {

              opacity: imageOpacity1,
              transform: [
                { translateY: titleTranslate },
                  {scale: titleScale }
              ],
            },
          ]}
        >
        <TouchableOpacity onPress={() => this.openDrawer()}>
          <Icon
                 name='map-o'
                 type='font-awesome'
                 size={25}
                 color={'#FF9F1C'}
                 underlayColor={'white'}

               />
             </TouchableOpacity>

        </Animated.View>
        <Animated.View
           style={[
             styles.center,
             {

               opacity: imageOpacity1,
               transform: [
                 { translateY: titleTranslate },
                   {scale: titleScale }
               ],
             },
           ]}
         >
          <Text style={{fontSize:21, fontWeight:'bold', color:'red'}}>Home</Text>

         </Animated.View>







       <Animated.View
          style={[
            styles.right,
            {
              opacity: imageOpacity1,
              transform: [
                { translateY: titleTranslate},
                {scale: titleScale },
              ],
            },
          ]}
        >
          <TouchableOpacity style={{marginRight:10}}>
              <Icon
              name='shopping-cart'
              color='blue'
              onPress={()=>{this.props.screenProps.cart()}}/>
            </TouchableOpacity>


      </Animated.View>
</View>

    )
  }
}
// ['rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 255)']
