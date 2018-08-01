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

          <ListView
            dataSource={this.state.items}
            style={{marginBottom: 30, backgroundColor:'pink', width: 150}}
            renderRow={(item) => (
              <View style={{ borderBottomWidth: 1, width: 150, marginBottom: 10, flexDirection: 'row', flex:1, backgroundColor: "lightblue"}}>

                <TouchableOpacity
                  onPress={()=>{}}
                  >
                <Text style={{textAlign: "center"}}>{item.ItemName}</Text>
                <Image
                  style={{
                      width: 150,
                      height: 150,
                    }}
                  source={{
                    uri: item.Pic_URL
                  }}
                />
                </TouchableOpacity>

              </View>
            )}
          />


      </ScrollView>

      </View>
    )
  }
}

export default BrowseGroceryScreen;
