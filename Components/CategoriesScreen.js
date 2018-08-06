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
import styles from './Styles';
import {Header, Icon} from 'react-native-elements';
import groceryItems from '../public/Inventory/Fresh_Meat'
import { Ionicons } from '@expo/vector-icons';
console.log('groceryItems',groceryItems);
const MEAT = {cat: 'meat', src: require('../assets/Meat.png')}
const PRODUCE = {cat: 'produce', src: require('../assets/Produce.png')}
const SEAFOOD = {cat: 'seafood', src: require('../assets/Seafood.png')}
const DAIRY = {cat: 'dairy', src: require('../assets/Dairy.png')}
const FROZEN = {cat: 'frozen', src: require('../assets/Frozen.png')}
const PRESERVED = {cat: 'preserved', src: require('../assets/Preserved.png')}
const BEVERAGES = {cat: 'beverage', src: require('../assets/Beverages.png')}
const SNACKS = {cat: 'snacks', src: require('../assets/Snacks.png')}
const NOODLES = {cat: 'noodles', src: require('../assets/Noodles.png')}
const SPICES = {cat: 'spice', src: require('../assets/Spices.png')}


class CategoriesScreen extends React.Component {
  //Location  Favorites,foods,home, history, search?
  static navigationOptions =({navigation}) => {
    const {state} = navigation
    return {
    title: <Text> Categories </Text>,
    headerRight: <TouchableOpacity style={{marginRight:10}}>
        <Icon
        name='shopping-cart'
        color='blue'
        onPress={()=>{state.params.cart()}}/>
      </TouchableOpacity>
    }

  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      items: this.ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    const {setParams} = this.props.navigation;
    setParams({cart: this.props.screenProps.cart})
    this.setState({items: this.ds.cloneWithRows(groceryItems)})
  }

  browseAisle (aisle) {
    fetch('http://localhost:3000/browse' + `?aisle=${aisle.toLowerCase()}`)
    .then((resp) => resp.json())
    .then(resp=>{
      console.log(resp);
    })
  }

  createCategory (cat1,cat2) {
    return  (
      <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity activeOpacity={0.75} onPress={()=>{this.browseAisle(cat1.cat)}}>
          <Image source={cat1.src} style={{height: 170,width: 170, marginLeft: 12, marginRight: 5, marginTop: 10,flex: 1}}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} onPress={()=>{this.browseAisle(cat2.cat)}}>
          <Image source={cat2.src} style={{height: 170,width: 170, marginRight: 12, marginLeft:5, marginTop: 10,flex: 1}}/>
        </TouchableOpacity>
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
