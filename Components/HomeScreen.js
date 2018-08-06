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
  AsyncStorage
} from 'react-native';
 // Version can be specified in package.json
import HorizontalMealScroll from './HorizontalMealScroll'
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon} from 'react-native-elements';
import styles from './Styles'



const G_IMG = require('../assets/goldenImage.jpg')
const D_IMG = require('../assets/goldenTemple.jpg')
const L_IMG = require('../assets/Coupon.jpg')


export default class HomeScreen extends React.Component {

  cartNavigate()
  {
    this.props.screenProps.cart()

  }

  static navigationOptions =({navigation}) => {
    const {state} = navigation
    return {
    title: <Text style={{color:'white'}}> Home </Text>,
    headerRight: <TouchableOpacity style={{marginRight:10}}>
        <Icon
        name='shopping-cart'
        color='blue'
        onPress={()=>{state.params.cart()}}/>
      </TouchableOpacity>
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
    }


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
    return (

      <View style={{flex:1, alignItems: 'flex-start'}}>
        <View style={{flex:0.0005}}>
          <TouchableOpacity style={{marginLeft:200,marginTop:59}}>
            <Icon
              name='shopping-cart'
              color='blue'
              onPress={()=>{state.params.cart()}}/>
            </TouchableOpacity>
          </View>


          <ScrollView style={{
            flex:12,
          }} scrollEnabled={true}
          enableEmptySections={true}
          >

            <ImageBackground
              source={G_IMG}
              style={[styles.goldenImage, {
                opacity: 0.8,
                justifyContent: 'flex-end',
                height: 170,

              }]}>


              {/* <View style={{
                flex: 1,
                alignItems: 'stretch',
                backgroundColor: '#F5FCFF',
              }}>
              <Text>{this.state.message}</Text> */}

              <TouchableOpacity
                style={{height: 40, backgroundColor:'white', borderRadius: 20, margin: 10, padding:3,display:null, alignItems:'center', justifyContent:'center', }}
                placeholder="Search for a Recipe"
                onPress={()=>{this.searchBar()}
              }>
              <Text style={{color:'grey'}}> Search Golden Express </Text>

              {/* <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.submit()} }>
              <Text style={styles.buttonLabel}>Search</Text>
            </TouchableOpacity> */}
            {/* </View> */}
          </TouchableOpacity>
        </ImageBackground>
        <View style={{backgroundColor:'#e5e5e5', alignItems:'center'}}>
          <Image
            source={L_IMG}
            style={{backgroundColor: 'grey',height:175, width: 240}}/>
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

        </ScrollView>
      </View>

    )
  }
}
