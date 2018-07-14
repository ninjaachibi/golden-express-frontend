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
import HorizontalMealScroll from './HorizontalMealScroll'
import MyMeals from './MyMeals'

const data = {}

class MyInfoScreen extends React.Component {
  static navigationOptions = {
    title: 'MyInfo'
  };
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {meals:[],pastMeals:[], name:'Robert Luo', calories:3000, age:14}
  }
    //run the component and have it fetch the data
    //each ingredient has its own page that displays what it looks like
    //how to make an image, where do i source
    //user gives quantities
    //algo updates quantities with respect to recipe and user's desires
  componentDidMount() {
    // fetch(url).then(resp=>
    //   resp.json())
    //   .then(resp=>
    //   {
    //     this.setState({})
    //   }).catch(err=>{console.log(err)})

  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex:1,alignItems:"flex-start", justifyContent:'center',backgroundColor:'#4fc2c4a3'}}>
          <Text style={{fontSize:25,color:'white',marginLeft:10, marginTop:10}}><Text style={{fontWeight:'bold'}}>Name: </Text> {this.state.name}</Text>
          <Text style={{fontSize:25,color:'white',marginLeft:10}}><Text style={{fontWeight:'bold'}}>Age: </Text>{this.state.age}</Text>
          <Text style={{fontSize:25,color:'white',marginLeft:10}}><Text style={{fontWeight:'bold'}}>Calories: </Text> {this.state.calories}</Text>
          <HorizontalMealScroll style={{flex:2}}/>
          <Text style={{fontSize:45,color:'white',marginLeft:10}}><Text style={{fontWeight:'bold'}}>My Meals </Text></Text>
          <MyMeals style={{flex:2}}/>


        </View>


      </View>

    )
  }
}

export default MyInfoScreen;
