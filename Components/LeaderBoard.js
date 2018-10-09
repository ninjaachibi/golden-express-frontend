
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
 ActivityIndicator
} from 'react-native';
import styles from './Styles';
import {Card} from 'react-native-elements'
import _ from 'underscore'
var groups = [{name: 'Crossed', points: 1000},
 {name:'Hammered', points: 2000},
  {name:'Done', points: 500},
  {name:' Trigged', points: 2500}]

class LeaderBoardScreen extends React.Component {
  static navigationOptions = {
    title:'LeaderBoard',
   };
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      orders:[],
      orderDate:null,
      items:[],
      username:'',
      totalPrice:0,
      groups: groups
    }
  }

componentDidMount(){
  this.getOrders()
}
getOrders(){
    AsyncStorage.getItem('token')
    .then(token =>{
        return(
            fetch('https://golden-express.herokuapp.com/userOrder',{
            headers: { Authorization:'Bearer ' + token }
          })
        )
    })
    .then((resp) => resp.json())
    .then(resp => {
      if(!resp.order) {
        console.log('no order found for user');
        this.setState({username:resp.username})
        return;
      }
      console.log('hitting', resp.order.totalPrice)
      console.log('user',resp.username)
      this.setState({
        orders:resp.order,
        items:resp.order.items,
        username:resp.username,
 //       totalPrice:resp.order.totalPrice
      })
    })
    .catch(err => console.log('error',err))
    }

    render(){

      return(

        <ScrollView style={{marginBottom:20}}>
          <View style={{alignItems:'center'}}>

          <Text style={[styles.checkOutTitle1, {marginLeft:10}]}>Welcome {this.state.username}</Text>
          <Text style={styles.checkOutTitle}>LeaderBoard :</Text>
          <View>
            {
              _.values(groups).map((group)=>{
                return (
                <View>
                <Text style={{color:'green', fontSize:24}}>{group.name}      {group.points}</Text>
              </View>
            )
              })
            }
          </View>
        </View>
          </ScrollView>
          )
        }
      }

export default LeaderBoardScreen
