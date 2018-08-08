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
          <View style={styles.singleCardBox}>          
            <Text style={styles.shoppingCartItem}>{item.item.name}</Text>
              <View style={styles.addAndRemoveBox}>
                <Icon name="remove" onPress={()=>{this.props.subtractFromCart(item.item)}} />       
                <Text style={styles.itemQuan}>{item.count} </Text>
                <Icon name="add"  onPress={()=>{this.props.addToCart(item.item)}} />
              </View>
          </View>
        </View>
          <View >
        <Text style={{textAlign:'right'}}>Total: ${getTotal(item)}</Text> 
          </View> 
        
      </Card>


      </View>
    )
  }
}
