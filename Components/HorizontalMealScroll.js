import React, { Component } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";

const data = [
  {
    imageUrl: "weekly-meal-plan-17-777037.jpg",
    title: "Weekly Meal Plan #17"
  },
  {
    imageUrl: "Creamy-Avocado-Pasta-547775.jpg",
    title: "Creamy Avocado Pasta"
  },
  {
    imageUrl: 'low-carb-frosty-812966.jpg',
    title: "Low Carb Frosty"
  }
];
class HorizontalMealScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
componentDidMount() {

}

//"#b3d9ff"
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{alignItems:'flex-end'}}>
          <TouchableOpacity>
          <Text style={{color:'red',marginTop:2,marginRight:10, fontWeight:'bold',fontSize:15}}>View more ></Text>
          </TouchableOpacity>
        </View>
<Text> Coupons</Text>
      <FlatList
        getItemLayout={(data, index) => (
           {length: 280, offset: 280 * index, index}
         )}

        horizontal
        data={this.state.data}
        renderItem={({ item: rowData }) => {
          return (
            <Card
              title={null}
              style={{color:"white"}}

              image={{ uri: rowData.imageUrl }}
              imageStyle={{width:115, height:115,borderRadius:32,marginLeft:9,marginTop:22}}
              containerStyle={{ borderColor: "white",marginLeft:-5, width: 125, height:190, borderColor:'white',borderRadius:30,backgroundColor:"white",alignItems:"center", justifyContent:'flex-start',}}
            >
              <View style={{marginTop:-5,width:110,alignItems:"flex-start"}}>
              <Text style={{ fontWeight:'bold',fontSize:9,marginBottom: 10, color:'black' }}>
                {rowData.title}
              </Text>
              </View>

            </Card>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
    );
  }
}

export default HorizontalMealScroll;
