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

import groceryItems from '../public/New_Inventory/new_meat.json'
console.log('groceryItems', groceryItems);

class ResultScreen extends React.Component {
  //Location  Favorites,foods,home, history, search?
  static navigationOptions ={
    title:'Results',
  };
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      items: this.ds.cloneWithRows([]),
      itemsOn: false,
      currentItem: null,
    }
  }

  componentDidMount() {
    this.setState({items: this.ds.cloneWithRows(groceryItems)})
  }

  //display components for every grocery item with the id passed in as the prop itemId
  displayItem (item) {
    console.log('item is', item); //may need to change this to a fetch request?
    this.setState({
      itemsOn: true,
      currentItem: item
    })
  }

  addToCart (item) {
    console.log('adding to cart', item);
  }

  render() {
    console.log('items',this.state.items);
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
        {this.state.itemsOn ?
          <View>
            <Text>Items are on</Text>
            <View style={{
              alignItems: 'center'
            }}>
              <Image
                style={{
                    width: 300,
                    height: 300,
                  }}
                source={{
                  uri: this.state.currentItem.Pic_URL
                }}
              />
            </View>
            <Text style={styles.textBig, {"color":"black"}}>{this.state.currentItem.ItemName}</Text>
            <Text style={{fontWeight: 'bold'}}>Price: {this.state.currentItem.Price}</Text>
            <Text style={{fontWeight: 'bold'}}>Description: {this.state.currentItem.Description}</Text>

            <Button
              onPress={()=>{this.addToCart(this.state.currentItem)}}
              title="Add Item to Cart"
              color="#841584"
            />

            <Button
              onPress={()=>{this.setState({itemsOn: false, currentItem:null})}}
              title="Go back"
              color="#841584"
            />

          </View>
          :
          <ListView
            dataSource={this.state.items}
            style={{marginBottom: 30, backgroundColor:'pink', width: 150}}
            renderRow={(item) => (
              <View style={{ borderBottomWidth: 1, width: 150, marginBottom: 10, flexDirection: 'row', flex:1, backgroundColor: "lightblue", textAlign: "center"}}>

                <TouchableOpacity
                  onPress={this.displayItem.bind(this, item)}
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
        }


      </ScrollView>

      </View>
    )
  }
}

export default ResultScreen;
