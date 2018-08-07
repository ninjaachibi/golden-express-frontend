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
import {Header, Icon} from 'react-native-elements';

export default class CartItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {item, getTotal} = this.props;
    let {height, width} = Dimensions.get('window');
    // console.log('height', height, 'width', width);
    return (
      <View style={{
        backgroundColor: '#F5FCFF',
        alignItems:'stretch',
        height: 100,
        width: width,
        borderStyle: 'solid',
        borderWidth: 1,
        flex:1
      }}>
        <Text>{item.item.name} Count: {item.count} Total: ${getTotal(item)}</Text>

        <Button title="add" onPress={()=>{this.props.addToCart(item.item)}} />
        <Button title="subtract" onPress={()=>{this.props.subtractFromCart(item.item)}} />


      </View>
    )
  }
}
