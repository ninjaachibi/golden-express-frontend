import React from 'react';


import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  Image,
  ScrollView,
  ImageBackground,
  AsyncStorage,
  Animated,
  Platform,
  StatusBar,
  Dimensions,
  Flatlist
} from 'react-native';
 // Version can be specified in package.json
import HorizontalMealScroll from './HorizontalMealScroll'
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon} from 'react-native-elements';
import styles from './Styles'

export default class ListItem extends React.Component {

  constructor(props) {
    super(props)
  }
  render(){
    return (
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{ borderBottomWidth: 1, width: 150, marginBottom: 10, flexDirection: 'row', flex:1, backgroundColor: "lightblue"}}>
          <TouchableOpacity
            >
          <Text style={{textAlign: "center"}}>{this.props.item[0].name}</Text>
          <Image
            style={{
                width: 150,
                height: 150,
              }}
            source={{
              uri: item[0].imgURI
            }}
          />
          </TouchableOpacity>
        </View>
        {!!item[1] ?
        <View style={{ borderBottomWidth: 1, width: 150, marginBottom: 10, flexDirection: 'row', flex:1, backgroundColor: "lightblue"}}>
          <TouchableOpacity
            // onPress={this.displayItem.bind(this, item[1])}
            >
          <Text style={{textAlign: "center"}}>{item[1].name}</Text>
          <Image
            style={{
                width: 150,
                height: 150,
              }}
            source={{
              uri: this.props.item[1].imgURI
            }}
          />
          </TouchableOpacity>
        </View> : null
      }
      </View>
    )
  }
}
