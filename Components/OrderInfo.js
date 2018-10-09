
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
class OrderInfo extends React.Component {
  static navigationOptions = {
    title:'Order',
   };
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      orders:[],
      orderDate:null,
      items:[],
      username:'',
      totalPrice:0
    }
  }
static navigationOptions = {
  title:"Your Order"
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

          <Text style={[styles.checkOutTitle1, {marginLeft:10}]}>Welcome {this.state.username}</Text>
          <Text style={styles.checkOutTitle}>Your Orders:</Text>
          <ScrollView >
            {this.state.orders.map((order)=>{
              return (
                <View>

                <Card>
                <Text style={{fontSize:18,fontWeight:"bold",marginBottom:20}}>OrderId: {order._id}</Text>
                  {order.items.map((item)=>{
                    return (
                      <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'flex-end'}}>
                      <Text style={{fontSize:18}}>{item.name}  {item.count}</Text>
                     </View>

                    )
                  })
                  }
                   <Text style ={{textAlign:'right',
                      fontWeight:'bold',
                      fontSize:18,
                      marginTop:15}}>Total:{order.totalPrice}
                    </Text>
                  {/* {order.totalPrice.map((totalPrice)=>{
                    return(
                      <Text style ={{textAlign:'right',
                      fontWeight:'bold',
                      fontSize:18,
                      marginTop:15}}>Total:{totalPrice}
                    </Text>
                    )
                  })} */}
                </Card>
                </View>
              )
            })}
            {/* <Card>
              {this.state.orders.length === 0 ?
                <Text>No past orders. Make your first order now!</Text>
                :
                {this.state.orders[0].items.map((item) => {
                  return (
                    <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'flex-end'}}>
                      <Text style={{fontSize:18}}>{item.name}  {item.count}</Text>
                    </View>)
                  })
              }




            </Card>
               */}

            </ScrollView>
          </ScrollView>
          )
        }
      }

export default OrderInfo
