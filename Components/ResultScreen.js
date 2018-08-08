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
import {Header, Icon} from 'react-native-elements';
import styles from './Styles'

import groceryItems from '../public/New_Inventory/new_meat.json'
console.log('groceryItems', groceryItems);

class ResultScreen extends React.Component {
  //Location  Favorites,foods,home, history, search?
  static navigationOptions = () => ({
    header: null //need to fix this + add go back
  });


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
    let groceryItems = this.props.navigation.getParam('groceryItems', [])
    console.log('passed in items', groceryItems);
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

  async addToCart (item) {
    // console.log('adding to cart', item);
    try {
      let cart = await AsyncStorage.getItem('cart', (err,res)=> {if(err)console.log('err',err);});
      cart = JSON.parse(cart);
      console.log('cart is',cart);
      if(!cart) {
        cart = {}
      }
        cart[item._id] = !!cart[item._id] ? {count: ++cart[item._id].count, item} : {count: 1, item};
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        console.log("added to cart", cart);
    }
    catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        marginLeft: 10,
        marginRight: 10,
      }}>
      <Text>Hi</Text>
      {/* <ScrollView style={{
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
                  uri: this.state.currentItem.imgURI
                }}
              />
            </View>
            <Text style={styles.textBig, {"color":"black"}}>{this.state.currentItem.name}</Text>
            <Text style={{fontWeight: 'bold'}}>Price: {this.state.currentItem.price}</Text>
            <Text style={{fontWeight: 'bold'}}>Description: {this.state.currentItem.description}</Text>

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
              <View style={{ borderBottomWidth: 1, width: 150, marginBottom: 10, flexDirection: 'row', flex:1, backgroundColor: "lightblue"}}>

                <TouchableOpacity
                  onPress={this.displayItem.bind(this, item)}
                  >
                <Text style={{textAlign: "center"}}>{item.name}</Text>
                <Image
                  style={{
                      width: 150,
                      height: 150,
                    }}
                  source={{
                    uri: item.imgURI
                  }}
                />
                </TouchableOpacity>

              </View>
            )}
          />
        }


      </ScrollView> */}

      </View>
    )
  }
}

export default ResultScreen;
