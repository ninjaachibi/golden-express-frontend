import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { Card } from "react-native-elements";

const data = [
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something two"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something three"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something four"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something five"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something six"
  }
];

class HorizontalMealScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
componentDidMount()
{
  fetch('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search' + `?number=100`, {
    headers: {
      "X-Mashape-Key": "iTqnNBvWSamshrNnx4RCtgFVlPuYp1srw8fjsnZerAuAVNTnjb",
      "Accept": "application/json",
    },
  })
  .then(res => res.json())
  .then(res => {this.setState({data:res.results.map((item)=>{
    return {title:item.title, imageUrl: 'https://spoonacular.com/recipeImages/' + item.imageUrls[0]}
  })})

  })
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
              containerStyle={{ padding: 0, width: 160 }}
            >
              <Text style={{ marginBottom: 10 }}>
                {rowData.title}
              </Text>
            </Card>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

export default HorizontalMealScroll;
