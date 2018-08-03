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
const D_IMG = require('../assets/goldenTemple.jpg')

class SearchScreen extends React.Component {
  static navigationOptions ={
    title: 'Search'
  };

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
              resizeMode:'cover',
              flex: 5
}]}>
    {/* <View style={{
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#F5FCFF',
    }}>
      <Text>{this.state.message}</Text> */}
<Text>  </Text>
      <TextInput
        autoFocus={true}

        style={{height: 40, backgroundColor:'white', borderRadius: 20, margin: 10, padding:3,display:null}}
        placeholder="Search for an Item"
        onChangeText={(text) => this.setState({search: text})}
      />
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

export default SearchScreen;
