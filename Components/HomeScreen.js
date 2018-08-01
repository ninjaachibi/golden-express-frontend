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
  Image
} from 'react-native';
import styles from './Styles'

import HorizontalMealScroll from './HorizontalMealScroll'

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
    }
  }
  //run the coponoennt and have it fetch the data
  //each ingredient has i\ts own page that displays what it looks like
  //how to make an image, where do i source
  //user gives quantities
  //algo updates quantiies with respect to recipe and user's desires

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
    return (
      <ScrollView scrollEnabled={this.state.enabled} >
        <View style={{height:100,backgroundColor:"#ff5c33",alignItems:'center',justifyContent:'center'}}>
        <View style={{flex:0.2, justifyContent:'center',alignItems:'center',marginTop:10}}>

          <TouchableOpacity style={{backgroundColor:'white', width:345, height:35,borderRadius:20,marginLeft:10,marginRight:10}} onPress={()=>{this.props.navigation.navigate('Search')}}>
            <TextInput
              style={{height: 30,fontSize:15, marginLeft:5, marginTop:2}}
              placeholder="Search Recipes"
              onChangeText={(text) => this.setState({search: text})}
            />
          </TouchableOpacity>
          </View>
        </View>
        <View style={{height:100,backgroundColor:"gold",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:60, color:'silver'}}>Coupon!</Text>
        </View>
						<View style={{flex:1,backgroundColor:'white'
}}>
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
