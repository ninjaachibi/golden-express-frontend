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
import { NavigationActions } from 'react-navigation';

 // Version can be specified in package.json
import HorizontalMealScroll from './HorizontalMealScroll'
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon, List, ListItem} from 'react-native-elements';
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






export default class DrawerContent extends React.Component {

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
      searchBar: false,
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,

    }


  }
  openContact(){
    this.props.screenProps.openContact()
  }


  //run the coponoennt and have it fetch the data
  //each ingredient has i\ts own page that displays what it looks like
  //how to make an image, where do i source
  //user gives quantities
  //algo updates quantiies with respect to recipe and user's desires


  navigateToScreen = (route) => () => {
      const navigate = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigate);
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


    console.log(this.state.scrollY)

    return (



      <View style={[styles.fill, {backgroundColor:'#EA9380'}]}>
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


        <View style={[styles.row,{backgroundColor:'transparent', alignItems:'center', justifyContent:'center'}]}>
          {/* <TouchableHighlight onPress={()=>this.props.navigation.navigate('HomeSearch')}> */}

          <ImageBackground style={{width:SCREEN_WIDTH* 1.25, height: 220, justifyContent:'center',position:'absolute', top: 25, left:-SCREEN_WIDTH*1/10, right:0}} source={B_IMG}>
          <Image
            source={L_IMG}
            style={{height:140, width: 180, borderRadius: 14, position:'absolute', top:65,left:SCREEN_WIDTH*1/9, right:0, marginBottom: 14, marginLeft: 75}}/>
          </ImageBackground>
          {/* </TouchableHighlight> */}
          </View>
          <View style={{position:'absolute', width: SCREEN_WIDTH,top:SCREEN_HEIGHT*1/3, left:0,right:0, zIndex:5}}>
          <ImageBackground style={{width:SCREEN_WIDTH* 1.25, height: SCREEN_HEIGHT*6/10, top:-10, justifyContent:'center',position:'absolute',left:-SCREEN_WIDTH*1/10, right:0}} source={B_IMG}>

              <List containerStyle={{marginBottom: 20, position:'absolute', top:-20, left:SCREEN_WIDTH*1/10,right:0}}>
      {
        list.map((l) => (

          <ListItem
            roundAvatar
            containerStyle={{width: SCREEN_WIDTH}}
            titleContainerStyle={{marginLeft:5}}
            onPress={l.route === 'Account' ? ()=> this.openContact() : this.navigateToScreen('Order')}
            key={l.route}
            title={l.route}
            leftIcon={l.icon}
          />
        ))
      }
    </List>
            <TouchableOpacity
             style={{height:50, alignItems:'center', justifyContent:'center',width: SCREEN_WIDTH*3/4,position:'absolute', top:SCREEN_HEIGHT*1/5,left:SCREEN_WIDTH*1/5,right:0, zIndex:7, backgroundColor:'#fcb6b3', borderRadius:12}}
             onPress={this.logout}><Text style={{color:'white', fontSize:24, fontWeight:'bold'}}>Logout</Text></TouchableOpacity>
           </ImageBackground>
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
            styles.header1,
            { opacity:imageOpacity,transform: [{ translateY: headerTranslate }] },
          ]}
        >

           <Animated.Image
             source={G_IMG}
             style={[styles.backgroundImage, {
               opacity: imageOpacity,
               transform: [{ translateY: imageTranslate }]


             }]}/>
             <View style={{position:'absolute', zIndex:6, top: SCREEN_HEIGHT*1/8, left:0, marginLeft: 10, alignItems:'flex-start'}}>
             <Text style={{ fontSize:36, color:'white'}}> Hi, Tester</Text>
             <Text style={{ fontSize: 14, color:'white'}}> Thanks for taking the time to
           try out our application. </Text>
         <Text style={{ fontSize: 14, color:'white'}}> We greatly appreciate it and would love your feedback!</Text>

</View>





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
         <View style={{position:'absolute', top:90, left:0,right: SCREEN_WIDTH*5/6}}>

        <TouchableOpacity onPress={this.navigateToScreen('Interface')} style={{marginTop:-31.5,marginLeft:-1}} >
          <Icon
                 name='close'
                 size={25}
                 color={'white'}
                 underlayColor={'white'}

               />
             </TouchableOpacity>
           </View>

           <View style={{position:'absolute', top:60,left:SCREEN_WIDTH*3/10,right:0}}>
          <Text style={{fontSize:21, fontWeight:'bold', color:'white',marginTop:-5}}>Golden Express</Text>
        </View>

          <View style={{marginTop:-25,marginLeft: 30}}>



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
           <View style={{position:'absolute', top:86, left:0,right: SCREEN_WIDTH*5/6}}>

         <TouchableOpacity style={{marginTop:-31.5,marginLeft:-1}} onPress={this.navigateToScreen('Interface')}>
           <Icon
                  name='close'
                  size={25}
                  color={'white'}
                  underlayColor={'white'}

                />
              </TouchableOpacity>
            </View>

              <View style={{position:'absolute', top:60,left:SCREEN_WIDTH*3/10,right:0}}>
             <Text style={{fontSize:21, fontWeight:'bold', color:'white',marginTop:-5}}>Golden Express</Text>
           </View>

           <View style={{marginTop:-25,marginLeft: 30}}>



           </View>

         </Animated.View>

</View>

    )
  }
}
// ['rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 255)']
