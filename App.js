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
  Image,
  ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './Components/Styles'
import RegisterScreen from './Components/RegisterScreen'
import LoginScreen from './Components/LoginScreen'
import CustomizeScreen from './Components/CustomizeScreen'
import MealScreen from './Components/MealScreen'
import CameraAccess from './Components/CameraAccess'
// import MealPlanScreen from './Components/MealPlanScreen'

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
      currentMeal: null,
      groceryList: [],
    }
  }

  componentDidMount() {
    fetch('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search' + `?query=steak`, {
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

  displayMeal (meal) {
    console.log('displaying meals');
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${meal.id}/information`, {
      headers: {
        "X-Mashape-Key": "iTqnNBvWSamshrNnx4RCtgFVlPuYp1srw8fjsnZerAuAVNTnjb",
        "Accept": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          recipesOn: true,
          currentMeal: data,
        })
      })
      .catch(err => console.log('error', err))
  }

  addToGroceryList (extendedIngredients) {
    console.log('in addToGroceryList');
    this.props.navigation.push('GroceryList', {
      groceries: extendedIngredients,
    })
  }

  render() {
    console.log('meals',this.state.meals);
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
      }}>
      <ScrollView style={{
        marginBottom:30
      }}>
        {this.state.recipesOn ?
          <View>
            <Text>Recipes are on</Text>
            <View style={{
              alignItems: 'center'
            }}>
              <Image
                style={{
                    width: 300,
                    height: 300,
                  }}
                source={{
                  uri: this.state.currentMeal.image
                }}
              />
            </View>

            <Text style={styles.textBig}>{this.state.currentMeal.title}</Text>
            <Text style={{fontSize: 20}}>Ready in {this.state.currentMeal.readyInMinutes} minutes {'\n'}</Text>

            <Text style={{fontWeight: 'bold'}}>Ingredients: </Text>
            {this.state.currentMeal.extendedIngredients.map((ingredient,i) => <Text key={i}>{ingredient.originalString}</Text>)}
            <Text></Text>

            <Text style={{fontWeight: 'bold'}}>Cooking Instructions: </Text>
            {this.state.currentMeal.instructions.split('.').map((line, i) => <Text style={{marginBottom:5}} key={i}>{`\u2022 ${line}`}</Text>)}

            <Button
              onPress={()=>{this.addToGroceryList(this.state.currentMeal.extendedIngredients)}}
              title="Add Ingredients to Grocery List"
              color="#841584"
            />


          </View>
          :
          <ListView
            dataSource={this.state.meals}
            style={{marginBottom: 30, backgroundColor:'pink', width: 100}}
            renderRow={(item) => (
              <View style={{ borderBottomWidth: 1, width: 100, marginBottom: 10, flexDirection: 'row', flex:1, backgroundColor: "lightblue"}}>

                <TouchableOpacity
                  onPress={this.displayMeal.bind(this, item)}
                  >
                <Text style={{textAlign: "center"}}>{item.title}</Text>
                <Image
                  style={{
                      width: 100,
                      height: 100,
                    }}
                  source={{
                    uri: "https://spoonacular.com/recipeImages/" + item.image
                  }}
                />
                </TouchableOpacity>

              </View>
            )}
          />
        }

      </ScrollView>

      </View>
    )
  }
}

class GroceryListScreen extends React.Component{
  static navigationOptions = {
    title: 'Grocery List'
  };
  constructor(props) {
    super(props)
    // this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      groceries: this.props.navigation.getParam('groceries'),
    }
  }

  componentDidMount() {
    //API =>this.props.name=>searches for ingredients and instructors
  }

  render() {
    console.log('grocery list:', this.state.groceries);
    return (
      <View style={styles.container}>
          <Text>Hello world</Text>

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
  GroceryList: {
    screen: GroceryListScreen,
  },
  Meal: {
    screen: MealScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  MyInfo: {
    screen:MyInfoScreen,
  },
  CameraAccess: {
    screen: CameraAccess,
  }
}, {initialRouteName: 'CameraAccess'});
