import React from 'react';
import {
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
  import { StackNavigator} from 'react-navigation';
  import { Icon } from 'react-native-elements'

  import OrderInfo from './OrderInfo'

  export default class Orders extends React.Component{
    constructor(props)
    {
      super(props);
      this.state = {
  
      }
    }

    render(){
        const stack={
            Orders :{
                screen: OrderInfo
            }
        }

        var OrdersStack = StackNavigator(stack,{initialRouteName:'Orders',
        headerMode:'screen',
        navigationOptions: {
          headerVisible: true,
          headerLeft: <Icon name='chevron-left' size={35} color={'blue'} 
          onPress={()=>{this.props.navigation.goBack()}}/>
        }
    })

    return(
        <View style={{flex:1}}>
            <OrdersStack />
        </View>
    )

    }
  }