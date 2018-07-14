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
import HorizontalMealScroll from './HorizontalMealScroll'

class SearchScreen extends React.Component {
  static navigationOptions ={
    title: 'Search'
  };

  constructor() {
    super();
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
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}>
        <Text>{this.state.message}</Text>

        <TextInput
          style={{height: 40}}
          placeholder="Search for a Recipe"
          onChangeText={(text) => this.setState({search: text})}
        />

        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.submit()} }>
          <Text style={styles.buttonLabel}>Search</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SearchScreen;
