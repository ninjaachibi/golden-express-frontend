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
  ScrollView,
  AsyncStorage
} from 'react-native';
import styles from './Styles'

import groceryItems from '../public/Inventory/Fresh_Meat'
console.log('groceryItems',groceryItems);
const F_IMG = require('../assets/Fruits.jpg')

class CategoriesScreen extends React.Component {
  //Location  Favorites,foods,home, history, search?
  static navigationOptions ={
    title:'Categories',
  };
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      items: this.ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    this.setState({items: this.ds.cloneWithRows(groceryItems)})
  }
  //display components for every meal with the object passed in as the prop <Meal>

  // displayMeal (meal) {
  //   console.log('displaying meals');
  //   fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${meal.id}/information`, {
  //     headers: {
  //       "X-Mashape-Key": "iTqnNBvWSamshrNnx4RCtgFVlPuYp1srw8fjsnZerAuAVNTnjb",
  //       "Accept": "application/json",
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       this.setState({
  //         recipesOn: true,
  //         currentMeal: data,
  //       })
  //     })
  //     .catch(err => console.log('error', err))
  // }


  render() {
    console.log('meals',this.state.items);
    return (

      <ScrollView style={{flex:1}}>
        <View style={{flex:1, justifyContent:'flex-start', alignItems:'flex-start',flexDirection:'row'}}>
        <Image source={F_IMG} style={{height: 150,width: 150, margin: 20,flex: 1, display:'inline'}}/>
        <Image source={F_IMG} style={{height: 150,width: 150,margin: 20, flex: 1, display: 'inline'}}/>
      </View>


      </ScrollView>

    )
  }
}

export default CategoriesScreen;
