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
    title:'BrowseGrocery',
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

  //display components for every grocery item with the id passed in as the prop itemId
  displayItem (itemId) {
  }


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
              <View style={{ borderBottomWidth: 1, width: 150, marginBottom: 10, flexDirection: 'row', flex:1, backgroundColor: "lightblue", textAlign: "center"}}>

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

export default ResultScreen;
