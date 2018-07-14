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

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };
  constructor(props)
  {
    super(props)
  }
  //run the coponoennt and have it fetch the data
  //each ingredient has i\ts own page that displays what it looks like
  //how to make an image, where do i source
  //user gives quantities
  //algo updates quantiies with respect to recipe and user's desires

  componentDidMount() {
    //fetch meallist
    //display top Meals
    //fetch recommended meals
    //create alogirthm that displays certain meals
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>Hello world</Text>
      </View>
    )
  }
}

export default HomeScreen;
