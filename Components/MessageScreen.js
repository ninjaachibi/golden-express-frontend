import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button
} from 'react-native';
import styles from './Styles'

class MessageScreen extends React.Component {
  static navigationOptions = {
    title:'Messages',
  };
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: this.ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    fetch('https://hohoho-backend.herokuapp.com/messages', {
      method:'GET'})
      .then(resp=>resp.json())
      .then(respJson=>{
        if (respJson.success)
        {
          console.log(respJson)
          this.setState({dataSource:this.ds.cloneWithRows(respJson.messages)})
        }
        //
      })
      .catch(err=>{
        console.log('Error' + err)
      })
  }

  render() {
    return (<View style={{backgroundColor:'gold',flex:1, justifyContent:'center',alignItems:'center'}}><ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) =><View><Text style={{fontSize:45, color:'black'}}>From: {rowData.from.username}</Text><View>
      <Text style={{fontSize:20, color:'black'}}>To: {rowData.to.username}</Text></View>
      <View>
      <Text style={{fontSize:20, color:'black'}}>Message: {rowData.body}</Text>
    </View>
    <View>
      <Text style={{fontSize:20, color:'black'}}>When: {rowData.timestamp}</Text></View></View>}
    /></View>)
  }
}

export default MessageScreen;
