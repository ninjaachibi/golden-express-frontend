import React, { Component } from "react";
import { FlatList, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";
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
const headerHeight = 50;

class HorizontalMealScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
componentDidMount() {
  // this.list.scrollToIndex({ index: 3 || 0 });
    let aisle = this.props.aisle ? this.props.aisle : 'produce'

    let category = aisle.charAt(0).toUpperCase()+aisle.slice(1)
    fetch('https://golden-express.herokuapp.com/browse' + `?aisle=${aisle.toLowerCase()}`)
    .then((resp) => resp.json())
    .then(resp => {
      // console.log('hitting',resp);
      this.setState({data:resp.items, category: category})

      // console.log(resp.items)
    })
    // this.refs.listRef.scrollToIndex({index:-1, animated: false})


}
onScrollEnd = (e) => {
   const scrollTop = e.nativeEvent.contentOffset.x;

   if (scrollTop < 5) {
     // Scrolls to top instead to y = 100
     this.flatList.scrollToOffset({
       x: 300,
       animated: true
     })
   }
 }


//"#b3d9ff"
  render() {
    return (
      <View style={{flex:1}}>

<Text style={{position:'absolute', top:12, marginLeft: 5, color:'white', fontSize: 16, fontWeight:'bold'}}> {this.state.category}</Text>
  <View style={{marginTop:10}}>
      <FlatList
        showsHorizontalScrollIndicator={false}

        getItemLayout={(data, index) => (
           {length: 125, offset: 125 * index, index}
         )}
         // ref={'listRef'}
        horizontal
        data={this.state.data}
        ref={
          (c) => {
            this.flatList = c;
          }
        }
        onScrollEndDrag={this.onScrollEnd}
        contentOffset={
         {x: 500, y: 0}
       }
        renderItem={({ item: rowData }) => {
          return (
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={()=>{console.log('Pressed'); this.props.openProduct(rowData)}}>
            <View>
            <Card
              title={null}
              initialNumToRender={10}
              style={{color:"transparent", backgroundColor:'transparent'}}
              wrapperStyle={{borderColor:'transparent', backgroundColor:'transparent'}}
              image={{ uri: rowData.imgURI }}

              imageStyle={{width:115, height:115, borderRadius: 10, marginLeft:9,marginTop:22, overflow:'hidden'}}
              containerStyle={{marginLeft:-5, width: 125, height:190, borderRadius: 10, borderColor:'transparent',backgroundColor:"transparent",alignItems:"center", justifyContent:'flex-start',}}
            >
              <View style={{marginTop:-5,width:110,alignItems:"flex-start"}}>
              <Text style={{ fontWeight:'bold',fontSize:12,marginBottom: 10, color:'white' }}>
                {rowData.name}
              </Text>
              </View>

            </Card>
          </View>
        </TouchableHighlight>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
    </View>
    );
  }
}

export default HorizontalMealScroll;
