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
  Dimensions
} from 'react-native';
import styles from './Styles'
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon, Card,Avatar, Button} from 'react-native-elements';

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
              source={{uri:item.item.imgURI}}
            />
              <View style={{}}>
                <Text style={{fontSize:18,fontWeight:'400'}}>{item.item.name}</Text>

                <View style={{alignItems:'space-between',}}>
                  <TouchableOpacity
                    style={{position:'absolute', top: 20, height: 25, width:75, backgroundColor:'blue', borderRadius:5, alignItems:'center', justifyContent:'center'}}
                    onPress={()=>{this.props.deleteFromCart(item.item)}}
                  >
                      <Text style={{fontSize: 16, color:'white'}}> Remove </Text>
                  </TouchableOpacity>

                  <View className="change-quantity" style={{flexDirection:'row',flexWrap:'wrap'}}>
                    {item.count === 1 ?
                      <Icon name="close" onPress={()=>{this.props.deleteFromCart(item.item)}}/>
                      :
                      <Icon name="remove" onPress={()=>{this.props.subtractFromCart(item.item)}} />
                    }
                    <Text style={{fontSize:16, marginTop:3,marginLeft:2}}>{item.count} </Text>
                    <Icon name="add"  onPress={()=>{this.props.addToCart(item.item)}} />
                  </View>

                  <View className="footer" style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{fontSize:16}}>Total: ${getTotal(item)}</Text>
                  </View>

                </View>
              </View>

            </View>

          </Card>


        </View>
    )
  }
}
