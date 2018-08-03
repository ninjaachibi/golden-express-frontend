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
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import styles from './Styles'

import groceryItems from '../public/Inventory/Fresh_Meat'
console.log('groceryItems',groceryItems);
const MEAT = require('../assets/Meat.png')
const PRODUCE = require('../assets/Produce.png')
const SEAFOOD = require('../assets/Seafood.png')
const DAIRY = require('../assets/Dairy.png')
const FROZEN = require('../assets/Frozen.png')
const PRESERVED = require('../assets/Preserved.png')
const BEVERAGES = require('../assets/Beverages.png')
const SNACKS = require('../assets/Snacks.png')
const NOODLES = require('../assets/Noodles.png')
const SPICES = require('../assets/Spices.png')


class CategoriesScreen extends React.Component {
  //Location  Favorites,foods,home, history, search?
  static navigationOptions ={
    title:'Browse Golden Express',
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

  createCategory (cat1,cat2) {
    return  (
      <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
        <TouchableHighlight activeOpacity={0.75}>
          <Image source={cat1} style={{height: 170,width: 170, marginLeft: 12, marginRight: 5, marginTop: 10,flex: 1}}/>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.75}>
          <Image source={cat2} style={{height: 170,width: 170, marginRight: 12, marginLeft:5, marginTop: 10,flex: 1}}/>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    console.log('meals',this.state.items);
    return (

      <ScrollView style={{flex:1}}>
        <View style={{height:12}}/>
        {this.createCategory(MEAT,PRODUCE)}
        {this.createCategory(SEAFOOD,DAIRY)}
        {this.createCategory(FROZEN,PRESERVED)}
        {this.createCategory(BEVERAGES,SNACKS)}
        {this.createCategory(NOODLES,SPICES)}

                    {/* <View style={{flex:1, justifyContent:'flex-start', alignItems:'flex-start',flexDirection:'row'}}>
                    <Image source={SEAFOOD} style={{height: 170,width: 170, margin:3, paddingLeft:2,marginLeft: 11,flex: 1}}/>
                    <Image source={DAIRY} style={{height: 170,width: 170,margin: 3, marginRight: 12,flex: 1}}/>
                  </View>
                  <View style={{flex:1, justifyContent:'flex-start', alignItems:'flex-start',flexDirection:'row'}}>
                  <Image source={FROZEN} style={{height: 170,width: 170, margin:3, paddingLeft:2,marginLeft: 11,flex: 1}}/>
                  <Image source={PRESERVED} style={{height: 170,width: 170,margin: 3, marginRight: 12,flex: 1}}/>
                </View>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'flex-start',flexDirection:'row'}}>
                <Image source={BEVERAGES} style={{height: 170,width: 170, margin:3, paddingLeft:2,marginLeft: 11,flex: 1}}/>
                <Image source={SNACKS} style={{height: 170,width: 170,margin: 3, marginRight: 12,flex: 1}}/>
              </View>
              <View style={{flex:1, justifyContent:'flex-start', alignItems:'flex-start',flexDirection:'row'}}>
              <Image source={NOODLES} style={{height: 170,width: 170, margin:3, paddingLeft:2,marginLeft: 11,flex: 1}}/>
              <Image source={SPICES} style={{height: 170,width: 170,margin: 3, marginRight: 12,flex: 1}}/>
            </View> */}

      <View style={{height:12}}/>

</ScrollView>

)
}
}

export default CategoriesScreen;
