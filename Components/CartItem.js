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
  ImageBackground,
  Dimensions
} from 'react-native';
import styles from './Styles'
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon, Card,Avatar} from 'react-native-elements';

export default class CartItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {item, getTotal} = this.props;
    let {height, width} = Dimensions.get('window');
    // console.log('height', height, 'width', width);
    return (
      <View >
        <Card>
        <View>
        <Avatar
          size="medium"
          rounded
          source={{uri:item.item.imgURI}}/>
         <View style={{}}>
            <Text style={{fontSize:18,fontWeight:'400'}}>{item.item.name}</Text>
            <View style={{alignItems:'space-between'}}> 
              <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <Icon name="remove" onPress={()=>{this.props.subtractFromCart(item.item)}} />
                <Text style={{fontSize:16, marginTop:3,marginLeft:2}}>{item.count} </Text>
                <Icon name="add"  onPress={()=>{this.props.addToCart(item.item)}} />
                </View>
                <Text style={{fontSize:16}}>Total: ${getTotal(item)}</Text>
              </View>
          </View>
        </View>

      </Card>


      </View>
    )
  }
}
