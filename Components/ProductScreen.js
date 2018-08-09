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
const MEAT = {cat: 'Meat', src: require('../assets/Meat.png')}
const PRODUCE = {cat: 'Produce', src: require('../assets/Produce.png')}
const SEAFOOD = {cat: 'Seafood', src: require('../assets/Seafood.png')}
const DAIRY = {cat: 'Dairy', src: require('../assets/Dairy.png')}
const FROZEN = {cat: 'Frozen', src: require('../assets/Frozen.png')}
const PRESERVED = {cat: 'Preserved', src: require('../assets/Preserved.png')}
const BEVERAGES = {cat: 'Beverage', src: require('../assets/Beverages.png')}
const SNACKS = {cat: 'Snacks', src: require('../assets/Snacks.png')}
const NOODLES = {cat: 'Noodles', src: require('../assets/Noodles.png')}
const SPICES = {cat: 'Spices', src: require('../assets/Spices.png')}


class ProductScreen extends React.Component {
  //Location  Favorites,foods,home, history, search?
  static navigationOptions =({navigation}) => {
    const {state} = navigation
    return {
    title: <Text> Categories </Text>,
    headerRight: <TouchableOpacity style={{marginRight:10}}>
        <Icon
        name='shopping-cart'
        color='blue'
      />
      </TouchableOpacity>
    }

  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      item: "",

    }
  }

  componentDidMount() {
    console.log("I have reached the Product Screen");
    let item = this.props.navigation.getParam("item", {})
    console.log(item)
    this.setState({item:item})

  }

  browseAisle (aisle) {
    fetch('https://golden-express.herokuapp.com/browse' + `?aisle=${aisle.toLowerCase()}`)
    .then((resp) => resp.json())
    .then(resp => {
      console.log('hitting',resp);
      this.props.navigation.navigate('Result', {groceryItems: resp.items, aisle: aisle})
    })
  }

  createCategory (cat1,cat2) {
    return  (
      <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity activeOpacity={0.75} >
          <Image source={cat1.src} style={{height: 170,width: 170, marginLeft: 12, marginRight: 5, marginTop: 10,flex: 1}}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} >
          <Image source={cat2.src} style={{height: 170,width: 170, marginRight: 12, marginLeft:5, marginTop: 10,flex: 1}}/>
        </TouchableOpacity>
      </View>
    )
  }



  render() {

    let groceryItems = this.props.navigation.getParam('name', "Okay")
    console.log(groceryItems)
    console.log(this.state.item)

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

export default ProductScreen;