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
  Flatlist,
} from 'react-native';
 // Version can be specified in package.json
import HorizontalMealScroll from './HorizontalMealScroll'
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon} from 'react-native-elements';
import styles from './Styles'
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const HEADER_MAX_HEIGHT = 30;//240;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const B_IMG = require('../assets/Gradient1.png')
const G_IMG = require('../assets/goldenImage.jpg')
const D_IMG = require('../assets/goldenTemple.jpg')
const L_IMG = require('../assets/Coupon.jpg')
const A_IMG = require('../assets/GradientLayers.png')



export default class ResultScreen extends React.Component {


  cartNavigate()
  {
    this.props.screenProps.cart()
  }

  listFiller(){
    return <View style={{width: 175, marginBottom: 10, padding: 10,flex:1, alignItems:'center'}}>
      <Text style={{textAlign: "center"}}></Text>
      <View
        style={{
            width: 150,
            height: 150,
          }}/>
    </View>
  }
  listImage(item){

    let split = item.name.split(",")
    let name = split[0]
    let count = !!split[1] ? split[1]: ""
    return (
      <View style={{ width: 160, flex:1, paddingLeft:10, paddingRight:10, marginBottom:40}}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={()=>this.openProduct(item)}
            >
        <Image
          style={{
            borderRadius:15,
              width: 130,
              height: 130,
            }}
          source={{
            uri: item.imgURI
          }}
        />
        </TouchableOpacity>
      </View>
        <View style={{alignItems:'flex-start',marginTop:20}}>
        <Text style={{textAlign: "left", marginLeft: 20, marginRight: -40,fontWeight:'bold',fontSize:17}}>{item.price}</Text>

        <Text style={{textAlign: "left", marginLeft: 20,marginRight: 0, marginTop:5, fontSize: 12}}>{name}</Text>
        <Text style={{textAlign: "left", marginLeft: 17.5,marginRight: -40, marginTop:5, fontSize: 12}}>{count}</Text>

      </View>

    </View>)
  }
  listImageFirst(item){
    let split = item.name.split(",")
    let name = split[0]
    let count = !!split[1] ? split[1]: ""
    return (
      <View style={{ width: 160,  flex:1, paddingLeft:10, paddingRight:10, marginBottom:40}}>
      <View style={{ alignItems:'center'}}>
        <TouchableOpacity
          onPress={()=>this.openProduct(item)}
          >
        <Image
          style={{
            borderRadius:15,
              width: 130,
              height: 130,
            }}
          source={{
            uri: item.imgURI
          }}
        />
        </TouchableOpacity>
      </View>

        <View style={{alignItems:'flex-start', marginTop:20}}>
        <Text style={{textAlign: "left", marginLeft:20, fontWeight:'bold', fontSize:17}}>{item.price}</Text>

        <Text style={{textAlign: "left", marginLeft: 20, fontSize: 12, marginTop:5}}>{name}</Text>
        <Text style={{textAlign: "left", marginLeft: 17.5, fontSize: 12, marginTop:5}}>{count}</Text>

      </View>

  </View>)
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
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      groceries: [],
      items: this.ds.cloneWithRows([]),
      search:"",
      itemsOn: false,
      currentItem: null,
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

    this.listImage = this.listImage.bind(this)
    this.listFiller = this.listFiller.bind(this)
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




  componentDidMount() {
    //fetch meallist
    //display top Meals
    //fetch recommended meals
    //create alogirthm that displays certain meals


    let groceryItems = this.props.navigation.getParam('groceryItems', [])
    let aisle = this.props.navigation.getParam('aisle', "Results")
    this.setState({aisle:aisle})

    console.log('ghjfhjfhgj',groceryItems)
    let double = []
    for (let i =0; i < groceryItems.length; i+=2)
    {
      let set = []
      !!groceryItems[i] ? set.push(groceryItems[i]):null
      !!groceryItems[i+1] ? set.push(groceryItems[i+1]):null
      double.push(set)
    }
    console.log('passed in items', double);
    this.setState({groceries: double})
    this.setState({items: this.ds.cloneWithRows(double)})


  }
  displayItem (item) {
    console.log('item is', item); //may need to change this to a fetch request?
    this.setState({
      itemsOn: true,
      currentItem: item
    })
  }


  press() {
    this.props.navigation.navigate('Search')
  }

  openProduct(item) {
    this.props.screenProps.openProduct(item)
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


    // console.log(this.state.scrollY)
    console.log(this.state.items)
    console.log("my groceries", this.state.groceries)

    return (



      <View style={[styles.fill, {backgroundColor:'white'}]}>
        <StatusBar
         translucent
         barStyle="light-content"
         backgroundColor="rgba(0, 0, 0, 0.251)"
       />

          <Animated.ScrollView
             scrollEventThrottle={1}
            contentContainerStyle={{alignItems:'center'}} style={{
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



          <View style={{flex:1,
            backgroundColor:'white',
}}>


            <ListView
              enableEmptySections={true}
              dataSource={this.state.items}
              removeClippedSubviews={false}
              intialRows={0}
              style={{width:SCREEN_WIDTH, margin: 10, marginTop: 80}}
              contentContainerStyle={{alignItems:"center"}}
              renderRow=
              {(item) =>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                {this.listImageFirst(item[0])}
                {!!item[1] ?
                this.listImage(item[1]) :
                this.listFiller()

              }
              </View>
              }
            />
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
            styles.headerResult,
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

        <TouchableOpacity style={{marginTop:-31.5,marginLeft:-5}} onPress={() => this.props.navigation.goBack()}>
          <Icon
                 name='chevron-left'
                 size={35}
                 color={'blue'}
                 underlayColor={'white'}

               />
             </TouchableOpacity>
           </View>

             <View style={{marginTop:-25,marginLeft: SCREEN_WIDTH*2/5}}>
            <Text style={{textAlign:'center',fontSize:16, fontWeight:'bold', color:'black'}}>{this.state.aisle}</Text>
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
// ['rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 255)']
