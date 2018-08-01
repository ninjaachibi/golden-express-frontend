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

class BrowseGroceryScreen extends React.Component {
  //Location  Favorites,foods,home, history, search?
  static navigationOptions ={
    title:'Plan Your Meals',
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
            <Button
              onPress={()=>{this.addToMeals(this.state.currentMeal)}}
              title="Add to Meal Plan"
              color="#841584"
            />


          </View>
          :
          <ListView
            dataSource={this.state.items}
            style={{marginBottom: 30, backgroundColor:'pink', width: 150}}
            renderRow={(item) => (
              <View style={{ borderBottomWidth: 1, width: 150, marginBottom: 10, flexDirection: 'row', flex:1, backgroundColor: "lightblue"}}>

                <TouchableOpacity
                  onPress={()=>{}}
                  >
                <Text style={{textAlign: "center"}}>{item.title}</Text>
                <Image
                  style={{
                      width: 150,
                      height: 150,
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

export default BrowseGroceryScreen;
