import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  RefreshControl,
  Image,
  ScrollView,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  Modal
} from 'react-native';
import styles from './Styles'
import { Ionicons,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import {Header, Icon, Card,Avatar, Button} from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width
export default class CartItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {item, getTotal} = this.props;
    let {height, width} = Dimensions.get('window');
    // console.log('height', height, 'width', width);
    return (
      <View>
        <Card
          containerStyle={{borderColor:'transparent',backgroundColor:"transparent"}}
          >
          <View style={{width:SCREEN_WIDTH *5/6}}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity underlayColor={'transparent'} onPress={()=>this.props.openProduct(item.item)}>
            <Image
              style={{height:50, width:50, borderRadius:5}}
              source={{uri:item.item.imgURI}}
            />
          </TouchableOpacity>
          <TouchableOpacity underlayColor={'transparent'} onPress={()=>this.props.openProduct(item.item)}>

            <View style={{marginLeft: 10, width: SCREEN_WIDTH * 1/3,flexDirection:'column'}}>
            <Text style={{fontWeight:'bold',fontSize:14}}>{item.item.name}</Text>
            <Text style={{fontSize:12}}>{item.item.price}</Text>

          </View>
        </TouchableOpacity>
          <View className="change-quantity" style={{position:'absolute', top:0, right:0, left:SCREEN_WIDTH * 2/3, flexDirection:'row',}}>
            {item.count === 1 ?
              <FontAwesome name="trash-o" style={{position:'absolute', top:2,left:-4,right:24}} size={18} color={'red'} onPress={()=>{this.props.deleteFromCart(item.item)}}/>
              :
              <View style={{position:'absolute', zIndex:3,top:3,left:0,right:54}}>
              <Ionicons name="md-remove" size={18} onPress={()=>{this.props.subtractFromCart(item.item)}} />
            </View>
            }
            <View style={{position:'absolute', top:7,left:16,right:0, width:30, height:10, alignItems:'center', justifyContent:'center'}}>
            <Text

          numberOfLines={1}
          
          style={{fontSize:14}}>{item.count} </Text>
          </View>
            <View style={{position:'absolute', top:0,left:42,right:0}}>
              <TouchableOpacity onPress={()=>{this.props.addToCart(item.item,1)}} >
            <Icon name="add" size={22}/>
          </TouchableOpacity>
          </View>
          </View>


          </View>
          <View style={{flexDirection:'row'}}>
            <TouchableHighlight underlayColor={'transparent'} onPress={()=>{this.props.deleteFromCart(item.item)}}>
              <View>
            <FontAwesome
              style={{position:'absolute', top: 5}}
              name={'trash-o'}
              size={16}
              color={'red'}
            />
            <Text style={{fontSize: 12,position:'relative', left:20,right: 0, top:6}}> Remove </Text>
</View>
          </TouchableHighlight>
              <View style={{position:'absolute', top:5,right:0,left:SCREEN_WIDTH*27/50, alignItems:'flex-end'}}>
            <Text style={{fontSize:14}}>Subtotal: ${getTotal(item)}</Text>
          </View>
        </View>
              <View style={{marginTop:10}}>

                <View style={{alignItems:'space-between',}}>



                </View>
              </View>

            </View>

          </Card>


        </View>
    )
  }
}
