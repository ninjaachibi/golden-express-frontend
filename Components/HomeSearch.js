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

class HomeSearch extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {state} = navigation
    return {
    title: 'Home Search',
    headerRight: <TouchableOpacity style={{marginRight:10}}>
        <Icon
        name='shopping-cart'
        color='blue'
        onPress={()=>{state.params.cart()}}/>
      </TouchableOpacity>
    }

  };

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

  submit() {
    console.log('clicked search');
    this.props.navigation.navigate('MealPlan', {
      query: this.state.search,
    });
  }

  render() {

    const { navigation } = this.props;
    {
     this.state.default ? this.setState({default: navigation.getParam('default', true)}): null
  }

    // if (this.state.default)
    // {
    //   this.setState({default:false},()=>  this.props.navigation.navigate('HomePage'))
    //
    // }

    console.log(this.state)
    if (this.state.default)
    {
      console.log(this.props.screenProps.home)
      this.props.screenProps.home()
    }



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

            }]}>
    {/* <View style={{
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#F5FCFF',
    }}>
      <Text>{this.state.message}</Text> */}

      <TextInput
        autoFocus={true}

        placeholder="Search for an Item"
        onKeyPress={() =>{this.setState({type: true})}}
        style={{textAlign: this.state.type ? 'left': 'center',borderColor:'black',height: 40, backgroundColor:'white',padding:3,display:null}}

        onChangeText={(text) => this.setState({search: text})}>
         </TextInput>
      <TouchableOpacity style={[styles.button, styles.buttonBlue]}
        onPress={ () => {this.submit()} }>
        <Text style={styles.buttonLabel}>Search</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.submit()} }>
        <Text style={styles.buttonLabel}>Search</Text>
      </TouchableOpacity> */}
    {/* </View> */}
</ImageBackground>

  </View>
    )
  }
}

export default HomeSearch;
