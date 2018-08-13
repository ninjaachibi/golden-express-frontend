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
  ImageBackground
} from 'react-native';
import styles from './Styles'
import HorizontalMealScroll from './HorizontalMealScroll'
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon} from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
const D_IMG = require('../assets/goldenTemple.jpg')
class SearchScreen extends React.Component {
  static navigationOptions =({navigation}) => {
    const {state} = navigation
    return {

    headerTitle: <Text style={{fontSize:18,fontWeight:'bold'}}> Search </Text>,
    headerRight: <TouchableOpacity style={{marginRight:10}}>
        <Icon
        name='shopping-cart'
        color='blue'
// Testing       onPress={()=>{state.params.cart()}}
        />
      </TouchableOpacity>
    }

  };



componentDidMount()
{
  const {setParams} = this.props.navigation;
//Testing  setParams({cart: this.props.screenProps.cart})
}
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      search: '',
      query:'',
    }
    this.searchItem = this.searchItem.bind(this)
  }


  searchItem(searchItem){
    fetch('https://golden-express.herokuapp.com/searchItem'+`?searchItem=${searchItem.charAt(0).toUpperCase()+searchItem.slice(1)}`)
    .then((resp)=> resp.json())
    .then(resp => {
      console.log(searchItem.charAt(0).toUpperCase()+searchItem.slice(1))
      console.log(searchItem)
      console.log('hitting',resp);
      this.props.navigation.navigate('SearchResults', {groceryItems: resp.items})//?????
    })
  }



  render() {
    let navigation = this.props.navigation;
    var suggestions = ['pork', "fish", "milk", 'eggs', 'bread', 'banana', 'butter', 'onion', 'pickled', 'chicken', 'beef']
    const data = suggestions.filter((item)=>item.indexOf(this.state.query) > -1)
    console.log(data)
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems:'stretch'
      }}>




      <View style={{justifyContent:'flex-start'}}>
        <Autocomplete
          autoCapitalize={'none'}
          data= {data}
          placeholder={<Text>Search Golden Express </Text>}
          defaultValue={this.state.query}
          onChangeText={text => this.setState({ query: text })}
          renderItem={item => (
      <TouchableOpacity onPress={() => this.searchItem(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    )}
/>
      </View>



  </View>
    )
  }
}

export default SearchScreen;
