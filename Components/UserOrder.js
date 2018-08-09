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
import {Card} from 'react-native-elements'

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
        console.log('hitting', resp.order.items)
        this.setState({items:resp.order.items}
        )})
    .catch(err => console.log('error',err))
    }

render(){
    return(
        <View>
        <Text style={styles.checkOutTitle}>Your Order:</Text>
        <ScrollView>
            
            <Card>{this.state.items.map((item)=>{
                return (<View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'flex-end'}}><Text>{item.name}  {item.count}</Text></View>)
            })}</Card>
          {/* {this.state.items.map((item)=>{
            return (<Text>{item}</Text>)
        })}       */}
 
        </ScrollView>
        </View>
    )
}

}


export default UserOrder