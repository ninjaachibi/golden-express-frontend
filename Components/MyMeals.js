import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { Card } from "react-native-elements";

const data = [
  {
    imageUrl: "https://spoonacular.com/recipeImages/weekly-meal-plan-17-777037.jpg",
    title: "Weekly Meal Plan #17"
  },
  {
    imageUrl: "https://spoonacular.com/recipeImages/Creamy-Avocado-Pasta-547775.jpg",
    title: "Creamy Avocado Pasta"
  },
  {
    imageUrl: 'https://spoonacular.com/recipeImages/low-carb-frosty-812966.jpg',
    title: "Low Carb Frosty"
  }
];

class MyMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
    };
  }
componentDidMount()
{
//   fetch('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search' + `?number=100`, {
//     headers: {
//       "X-Mashape-Key": "iTqnNBvWSamshrNnx4RCtgFVlPuYp1srw8fjsnZerAuAVNTnjb",
//       "Accept": "application/json",
//     },
//   })
//   .then(res => res.json())
//   .then(res => {console.log(res);
//     this.setState({data:res.results.map((item)=>{
//     return {title:item.title, imageUrl: 'https://spoonacular.com/recipeImages/' + item.imageUrls[0], id: item.id}
//   })
// })
//
// })
// .then(()=>{
//   var meal = this.state.data[0].id
//   fetch('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/' + 1002030 + '/information', {
//     headers: {
//       "X-Mashape-Key": "iTqnNBvWSamshrNnx4RCtgFVlPuYp1srw8fjsnZerAuAVNTnjb",
//       "Accept": "application/json",
//     },
//   })
//   .then(res => res.json())
//   .then(res => {console.log(res);
//     // this.setState({data:res.results.map((item)=>{
//     // return {title:item.title, imageUrl: 'https://spoonacular.com/recipeImages/' + item.imageUrls[0], id: item.id}
//   })
// })

}


  render() {
    return (
      <FlatList
        horizontal
        data={this.state.data}
        renderItem={({ item: rowData }) => {
          return (
            <Card
              title={null}
              image={{ uri: rowData.imageUrl }}
              containerStyle={{ padding: 0, width: 160, height:280, borderRadius:10,backgroundColor:"#b3d9ff"}}
            >
              <Text style={{ fontSize:18,marginBottom: 10, color:'white' }}>
                {rowData.title}
              </Text>
              <Text style={{ fontSize:18,marginBottom: 10, color:'white' }}>
                {rowData.calories}
              </Text>
            </Card>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

export default MyMeals;
