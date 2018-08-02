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
const L_IMG = require('../assets/lol.jpg')


class HomeScreen extends React.Component {
  static navigationOptions ={
    title:'Golden Express',
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

  searchBarScreen() {
    console.log("Registered press")
    if (!this.state.searchBar)
    {
      this.setState({searchBar:true})
    }

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
    console.log(this.state);
    const view = () => {
      if (this.state.searchBar)
      {
        return {
          flex: 1,
          backgroundColor: '#F5FCFF',
          alignItems:'stretch'
        }
      }
      else {

          return {}

      }
    }
    const display = () => {
      return this.state.searchBar ? 'none': null;
    }

    const searchBarScreen = () => {
      console.log("Registered press")
      if (!this.state.searchBar)
      {
        this.setState({searchBar:true})
      }
    }
    console.log(view())
    console.log(display())
    console.log(this.state)
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



      <View style={{
        flex:1,
      }}>

      <ScrollView style={{
        flex:1,
      }} scrollEnabled={!this.state.searchBar} >

            <View style={view()}>
              <ImageBackground
                  source={this.state.searchBar ? D_IMG: G_IMG}
                  style={[styles.goldenImage, {opacity: this.state.searchBar ? 0.69:0.8, justifyContent: this.state.searchBar ? 'flex-start': 'flex-end',height: this.state.searchBar ? 800: 170, flex: this.state.searchBar ? 5: null
}]}>
          {/* <View style={{
            flex: 1,
            alignItems: 'stretch',
            backgroundColor: '#F5FCFF',
          }}>
            <Text>{this.state.message}</Text> */}

            <TextInput
              style={{height: 40, backgroundColor:'white', borderRadius: 20, margin: 10, padding:3,display:null}}
              placeholder="Search for a Recipe"
              onChangeText={(text) => this.setState({search: text})}
              onTouchStart={() => {this.searchBarScreen()}}
            />
            <TouchableOpacity style={[styles.button, styles.buttonBlue, {display: this.state.searchBar ? null: 'none'}]} onPress={ () => {this.submit()} }>
              <Text style={styles.buttonLabel}>Search</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.submit()} }>
              <Text style={styles.buttonLabel}>Search</Text>
            </TouchableOpacity> */}
          {/* </View> */}
</ImageBackground>
        </View>
<ImageBackground
  source={L_IMG}
style={{height:120,display: display()}}/>
						<View style={{flex:1,backgroundColor:'white',display:display(), alignItems:'flex-start'}}>

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

export default HomeScreen;
