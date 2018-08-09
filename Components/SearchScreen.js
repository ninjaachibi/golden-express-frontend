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
        onPress={()=>{state.params.cart()}}/>
      </TouchableOpacity>
    }

  };

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


componentDidMount()
{
  const {setParams} = this.props.navigation;
  setParams({cart: this.props.screenProps.cart})
}
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      search: '',
    }
  }



  render() {
    let navigation = this.props.navigation;

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems:'stretch'
      }}>

        <ImageBackground
            source={D_IMG}
            style={[styles.goldenImage, {
              opacity: 0.69,
              justifyContent:'flex-start',
              height: null,
              width:null,
              flex: 5
            }]}>


      <View style={{justifyContent:'flex-start'}}>
        <TextInput

          style={{height: 40, width: 375, backgroundColor:'white',display:null, padding:3}}
          placeholder="Search for an Item"
          onChangeText={(text) => this.setState({search: text})}
        />
        <TouchableOpacity style={[styles.button, styles.buttonBlue]}
          onPress={ () => {this.searchItem(this.state.search)} }>
          <Text style={styles.buttonLabel}>Search</Text>
        </TouchableOpacity></View>
<Text>  </Text>

      {/* <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.submit()} }>
        <Text style={styles.buttonLabel}>Search</Text>
      </TouchableOpacity> */}
    {/* </View> */}
</ImageBackground>

  </View>
    )
  }
}

export default SearchScreen;
