import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './Components/Styles'
import RegisterScreen from './Components/RegisterScreen'
import LoginScreen from './Components/LoginScreen'
import CustomizeScreen from './Components/CustomizeScreen'
import MealScreen from './Components/MealScreen'
import MealPlanScreen from './Components/MealPlanScreen'


// class MyInfo extends React.Component{
//   static navigationOptions ={ title: 'MyInfo'}
//   constructor(props)
//   {
//     super(props)
//     this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     this.state = {Calories:"", HistoricCalories:""}
//
//   }
//
//
// }

class RecipeScreen extends React.Component{
  static navigationOptions = {
    title: 'Recipe'
  };
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {name: this.props.name, ingredients: this.ds.cloneWithRows([]), instructions: "",}
  }

  componentDidMount() {
    //API =>this.props.name=>searches for ingredients and instructors
    this.setState({ingredients: this.ds.cloneWithRows()})
  }

  render() {
    return (<View><ListView
      dataSource={this.state.meals}
      renderRow={(meal) =>
        <View>
          <Text style={{fontSize:45, color:'black'}}>From: {meal.from.username}</Text>
          <View>
            <Text style={{fontSize:20, color:'black'}}>To: {meal.to.username}</Text>
          </View>
          <View>
            <Text style={{fontSize:20, color:'black'}}>Message: {meal.body}</Text>
          </View>
          <View>
            <Text style={{fontSize:20, color:'black'}}>When: {meal.timestamp}</Text>
          </View>
        </View>
        }
        />
        <ListView
          dataSource={this.state.meals}
          renderRow={(meal) =>
            <View>
              <Text style={{fontSize:45, color:'black'}}>From: {meal.from.username}</Text>
              <View>
                <Text style={{fontSize:20, color:'black'}}>To: {meal.to.username}</Text>
              </View>
            </View>}
          />
        </View>)
      }
}

class MyInfoScreen extends React.Component {
  static navigationOptions = {
    title: 'MyInfo'
  };
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {meals:"",pastMeals:"", name:"", calories:"", age:""}
  }
    //run the component and have it fetch the data
    //each ingredient has its own page that displays what it looks like
    //how to make an image, where do i source
    //user gives quantities
    //algo updates quantities with respect to recipe and user's desires
  componentDidMount() {
    fetch(url).then(resp=>
      resp.json())
      .then(resp=>
      {
        this.setState({})
      }).catch(err=>{console.log(err)})

  }

  render() {
    return (
  //insert search inhjujk
  //takes the daily meals
  //insert a list view that takes meallist
      <View>
        <ListView></ListView>
    </View>
    //....more imasges
    )
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };
  constructor(props)
  {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {MealList:"",MyMeals:""}
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
  }

  render() {
    return (
    //insert search inhjujk
    //takes the daily meals
    //insert a list view that takes meallist
      <View>
        <Input></Input>
    </View>
    //....more imasges

    )
  }
}

//where can we load the database
//should we load data during rendeirng
//how do you load data beforehand so you don't ahve to load data
//how do you navigage to a certain page or class if you have multiple of the same classes
// connect a specific image to a class of meal/recipe/ingredient



//Navigator
export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  MealPlan: {
    screen: MealPlanScreen,
  },
  Recipe: {
    screen: RecipeScreen,
  },
  Meal: {
    screen: MealScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  MyInfo: {
    screen:MyInfoScreen,
  }
}, {initialRouteName: 'Login'});
