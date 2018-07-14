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
  ScrollView
} from 'react-native';
import styles from './Styles'

class MyInfoScreen extends React.Component {
  static navigationOptions = {
    title: 'MyInfo'
  };
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {meals:"",pastMeals:"", name:"", calories:"", age:""}
  }
    //run the component and have it fetch the data
    //each ingredient has its own page that displays what it looks like
    //how to make an image, where do i source
    //user gives quantities
    //algo updates quantities with respect to recipe and user's desires
  componentDidMount() {
    fetch(url).then(resp=>
      resp.json())
      .then(resp=>
      {
        this.setState({})
      }).catch(err=>{console.log(err)})

  }

  render() {
    return (
      <View style={styles.container}>
          <Text>Hello world</Text>
      </View>

    )
  }
}

export default MyInfoScreen;
