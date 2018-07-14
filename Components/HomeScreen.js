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
  Image
} from 'react-native';
import styles from './Styles'

import HorizontalMealScroll from './HorizontalMealScroll'

class HomeScreen extends React.Component {
  static navigationOptions ={
    title:'Home',
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
      <View style={styles.container}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Search')}}>
            <TextInput
              style={{height: 40}}
              placeholder="Search Recipes"
              onChangeText={(text) => this.setState({search: text})}
            />
          </TouchableOpacity>

          <View style={{flex:2, marginLeft: 5, marginRight:5}}>
            <Text style={styles.textBig}>Today's Meals:</Text>
            <View style={{flexDirection:'row', justifyContent: 'space-around', alignItems: 'center', }}>

              <TouchableOpacity onPress={()=>{}}>
                <View style={{backgroundColor:"blue", height: 100, width: 100, marginLeft: 10, marginRight: 10, marginTop: 10}}>
                    <Image
                      style={{borderRadius:15,
                          width: 100,
                          height: 100,
                        }}
                      source={{
                        uri: 'https://spoonacular.com/recipeImages/323420-556x370.jpeg'//this.state.meals.image
                      }}
                    />

                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{}}>
                <View style={{backgroundColor:"yellow", height: 100, width: 100, marginLeft: 10, marginRight: 10, marginTop: 10}}>
                  <Image
                    style={{
                        width: 100,
                        height: 100,
                      }}
                    source={{
                      uri: "https://spoonacular.com/recipeImages/507501-556x370.jpg"//this.state.meals.image
                    }}
                  />
                </View>
              </TouchableOpacity>
sds              <TouchableOpacity onPress={()=>{}}>
                <View style={{backgroundColor:"red", height: 100, width: 100, marginLeft: 10, marginRight: 10, marginTop: 10}}>
                  <Image
                  style={{
                      width: 100,
                      height: 100,
                    }}
                  source={{
                    uri: "https://spoonacular.com/recipeImages/716461-556x370.jpg"//this.state.meals.image
                  }}
                />
                </View>
              </TouchableOpacity>

            </View>


            <View style={{marginTop: 30}}>
              <Button
                onPress={()=>{this.props.navigation.navigate('GroceryList')}}
                title="GroceryList"
              />
              <Button
                onPress={()=>{this.props.navigation.navigate('Search')}}
                title="Recipes"
              />
              <Button
                onPress={()=>{this.props.navigation.navigate('CameraAccess')}}
                title="Scan Your Receipt"
              />
            </View>

          </View>

          <View style={{marginLeft: 13, marginRight:5}}>
            <Text style={{fontSize:15}}>Recommended: </Text>
          </View>
          <HorizontalMealScroll style={{flex:1}}/>

      </View>

    )
  }
}

export default HomeScreen;
