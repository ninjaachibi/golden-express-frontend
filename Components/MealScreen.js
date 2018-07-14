import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button
} from 'react-native';
import styles from './Styles'

//scroll horizontally disply horizontally
class MealScreen extends React.Component{
  static navigationOptions = {
    title: 'Meal'
  };
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      nutrition: "",
      name: ""
    }
  }
  //run the coponoennt and have it fetch the data
  //each ingredient has i\ts own page that displays what it looks like
  //how to make an image, where do i source
  //user gives quantities
  //algo updates quantiies with respect to recipe and user's desires
  componentDidMount(){
  }

  render() {
    return (
      // insert in views  <Recipe name = this.props.name></>
      <View>

      </View>
      //....more imasges

    )
  }
}

export default MealScreen;
