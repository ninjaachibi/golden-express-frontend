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
  ScrollView,
  AsyncStorage,
  FlatList,
  Image,
  ImageBackground
} from 'react-native';
import styles from './Styles'

import HorizontalMealScroll from './HorizontalMealScroll'
const G_IMG = require('../assets/goldenImage.jpg')
const D_IMG = require('../assets/goldenTemple.jpg')
const L_IMG = require('../assets/Coupon.jpg')


class HomeScreen extends React.Component {

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

  render() {
    // console.log(this.state);
    // const view = () => {
    //   if (this.state.searchBar)
    //   {
    //     return {
    //       flex: 1,
    //       backgroundColor: '#F5FCFF',
    //       alignItems:'stretch'
    //     }
    //   }
    //   else {
    //
    //       return {}
    //
    //   }
    // }
    // const display = () => {
    //   return this.state.searchBar ? 'none': null;
    // }
    //
    // const searchBarScreen = () => {
    //   console.log("Registered press")
    //   if (!this.state.searchBar)
    //   {
    //     this.setState({searchBar:true})
    //   }
    // }
    // console.log(view())
    // console.log(display())
    // console.log(this.state)
    return (

      // <View style={{
      //   flex: 1,
      //   alignItems: 'center',
      //   backgroundColor: '#F5FCFF',
      // }}>
      //   <Text>{this.state.message}</Text>
      //
      //   <TextInput
      //     style={{height: 40}}
      //     placeholder="Search for a Recipe"
      //     onChangeText={(text) => this.setState({search: text})}
      //   />
      //
      // <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.submit()} }>
      //   <Text style={styles.buttonLabel}>Search</Text>
      // </TouchableOpacity>
      // </View>





      <ScrollView style={{
        flex:1,
      }} scrollEnabled={true}
      enableEmptySections={false}
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
            onPress={()=>{this.props.navigation.navigate('Search')}
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

)
}
}

export default HomeScreen;
