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

/* MAKE YOUR OWN MEALS*/
class CustomizeScreen extends React.Component{
  static navigationOptions = {
    title: 'MyInfo'
  };
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {name:"",ingredient:[], recipe:""}
  }
//run the coponoennt and have it fetch the data
//each ingredient has i\ts own page that displays what it looks like
//how to make an image, where do i source
//user gives quantities
//algo updates quantiies with respect to recipe and user's desires
  componentDidMount() {
    fetch(url,{method:'POST',body:{}}).then(resp=>
      resp.json())
      .then(resp=>
      {
        this.setState({})
      }).catch(err=>{console.log(err)})
  }
  //function this.split(''), then upload every ingredient into ingredients
  //separate every ingreident with a comma
  //recipe

  render() {
    return (
  //insert search inhjujk
  //takes the daily meals
  //insert a list view that takes meallist
      <View>
        <TextInput></TextInput>
    </View>
    //....more imasges
    )
  }
}

export default CustomizeScreen;
