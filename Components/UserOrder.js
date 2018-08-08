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
import styles from './Styles';

class UserOrder extends React.Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            orderDate:null,
            items:[]
        }
    }

static navigationOptions = {
    title:"Your Order"
}
componentDidMount(){

    this.getOrders()

}

getOrders(){
    console.log('hi')
    AsyncStorage.getItem('token')
    .then(token =>{
        return(
            fetch('https://golden-express.herokuapp.com/userOrder',{
            headers: { Authorization:'Bearer ' + token }
          })
        )
    })
    .then((resp) => resp.json())
    .then(resp =>{ 
        console.log('hitting', resp.order)
        this.setState({items:resp.order.item}
        )})
    .catch(err => console.log('error',err))
    }

render(){
    return(
        <View>
        <Text>Your Order:</Text>
        <ScrollView>

          {this.state.items.map((item)=>{
            return (<Text>{item}</Text>)
        })}      
 
        </ScrollView>
        </View>
    )
}

}




export default UserOrder