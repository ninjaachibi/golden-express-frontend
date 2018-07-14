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
  RefreshControl,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './Components/Styles'
import RegisterScreen from './Components/RegisterScreen'
import LoginScreen from './Components/LoginScreen'
import CustomizeScreen from './Components/CustomizeScreen'
import MealScreen from './Components/MealScreen'
// import MealPlanScreen from './Components/MealPlanScreen'


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

class MealPlanScreen extends React.Component {
  //Location  Favorites,foods,home, history, search?
  static navigationOptions ={
    title:'Plan Your Meals',
  };
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      meals: this.ds.cloneWithRows([]),
      recipesOn: false,
    }
  }

  componentDidMount() {

    fetch('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search' + `?query=cum`, {
      headers: {
        "X-Mashape-Key": "iTqnNBvWSamshrNnx4RCtgFVlPuYp1srw8fjsnZerAuAVNTnjb",
        "Accept": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({meals: this.ds.cloneWithRows(data.results)})
      })
      .catch(err => console.log('error', err))
  }
  //display components for every meal with the object passed in as the prop <Meal>
  render() {
    console.log('meals',this.state.meals);
    return (
      <View style={styles.container}>

        <ListView
          dataSource={this.state.meals}
          style={{marginBottom: 30}}
          renderRow={(item) => (
            <View style={{ borderBottomWidth: 1, width: 300, marginBottom: 10, flexDirection: 'row', flex:1}}>
              <TouchableOpacity
                onPress={()=>{}}
                >
              <Text style={{textAlign:"center"}}>{item.title}</Text>
              <Image
                style={{
                    width: 51,
                    height: 51,
                  }}
                source={{
                  uri: "https://spoonacular.com/recipeImages/" + item.image
                }}
              />
              </TouchableOpacity>
            </View>
          )}
        />


      </View>
    )
  }
}

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
    return (
      <View style={styles.container}>
          <Text>Hello world</Text>

          <ListView
            dataSource={this.state.dataSource}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            style={{marginBottom: 30}}
            renderRow={(item) => (
              <View style={{alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, width: 350, marginBottom: 10}}>
                <TouchableOpacity
                  onPress={()=>{}}
                  >
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
      </View>

    )
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
      <View style={styles.container}>
          <Text>Hello world</Text>
      </View>

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
      <View style={styles.container}>
          <Text>Hello world</Text>
      </View>
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
}, {initialRouteName: 'MealPlan'});
