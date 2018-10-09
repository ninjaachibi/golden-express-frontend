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
  TouchableHighlight,
  Image,
  ScrollView,
  AsyncStorage,
  ImageBackground,
  Dimensions
} from 'react-native';

import styles from './Styles'
import HorizontalMealScroll from './HorizontalMealScroll'
import { Ionicons, Entypo } from '@expo/vector-icons';
import {Header, Icon} from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
const D_IMG = require('../assets/goldenTemple.jpg')
const SCREEN_WIDTH = Dimensions.get('window').width
class HomeSearch extends React.Component {
  static navigationOptions =({navigation}) => {
    const {state} = navigation
    return {
      header:null


    }

  };
updateText(text){
  this.setState({query:text})
}


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
    this.updateText = this.updateText.bind(this)


  }


  searchItem(searchItem){
    let item = searchItem.charAt(0).toUpperCase()+searchItem.slice(1)
    fetch('https://golden-express.herokuapp.com/searchItem'+`?searchItem=${item}`)
    .then((resp)=> resp.json())
    .then(resp => {
      console.log(searchItem.charAt(0).toUpperCase()+searchItem.slice(1))
      console.log(searchItem)
      console.log('hitting',resp);
      this.props.navigation.navigate({key:'HomeResults', routeName:'HomeResults', params:{groceryItems: resp.items, aisle:item}})//?????
    })
  }

  cartNavigate()
  {
    this.props.screenProps.cart()

  }

  render() {

    console.log('query', this.state.query)
    let navigation = this.props.navigation;
    var suggestions = ['pork', "fish", "milk", 'eggs', 'bread', 'banana', 'butter', 'onion', 'pickled', 'chicken', 'beef','juice', 'mussel', 'seaweed', 'papaya']
    const data = suggestions.filter((item)=>item.indexOf(this.state.query) > -1)
    console.log(data)
    return (
      <View style={{backgroundColor:'white',  flex: 1,
        alignItems:'stretch',justifyContent:'flex-start'}}>
      <View style={{

        marginTop:46,

      }}>




        <TouchableOpacity style={{position:'absolute', top: 4, zIndex: 5}} onPress={() => this.props.navigation.goBack()}>
          <Icon
            name='chevron-left'
            size={35}
            color={'grey'}
            underlayColor={'white'}

          />
        </TouchableOpacity>
        <Autocomplete
          containerStyle={{marginTop:3}}
          listContainerStyle={{borderColor:'white'}}
          listStyle={{borderColor:'white'}}
          inputContainerStyle={{borderColor:'white'}}
          renderTextInput={()=><View style={{flexDirection:'row',marginTop:5, marginBottom:5}}>
            <Ionicons style={{position:'absolute', left:SCREEN_WIDTH*1/8, marginTop:5, zIndex: 3}}
              name='ios-search'
              size={20}
              color={'grey'}/>
              <TextInput
                autoFocus={true}
                placeholderTextColor={'black'}
                autoCapitalize={'none'}
                onChangeText={(text)=> this.updateText(text)}
                placeholder={'Search Golden Express...'}
                style={styles.searchInput}
                value={this.state.query}
              onSubmitEditing={()=>this.searchItem(this.state.query)}/>
              {this.state.query.length > 0 ?
              <Entypo style={{position:'absolute', top:3, left:SCREEN_WIDTH*4/5, marginTop:5, zIndex: 3}}
                name='circle-with-cross'
                size={15}
                color={'grey'}
              onPress={()=>{this.setState({query:""})}}/> : null
            }

              </View>}
          data= {data}

          renderItem={item => (

      <TouchableOpacity onPress={() => this.searchItem(item)}>
        <View style={styles.searchItem}>
        <Ionicons style={{marginTop: 4,marginLeft: 7.5, marginRight:7.5}}
          name='ios-search'
          size={15}
          color={'grey'}/>
        <Text>{item}</Text>
        <View style={{position:'absolute', left: SCREEN_WIDTH * 9/10 }}>
        <Icon
          name='chevron-right'
          size={15}
          underlayColor={'white'}
          color={'grey'}/>
        </View>
      </View>
      </TouchableOpacity>
    )}
/>
<TouchableOpacity onPress={()=>{console.log('pressed'); this.cartNavigate()}} style={{position:'absolute', top: 10, left: SCREEN_WIDTH * 9/10, zIndex:3}}>
    <Icon
    name='shopping-cart'
    color='grey'
    />
  </TouchableOpacity>
      </View>
    </View>



    )
  }
}

export default HomeSearch;
