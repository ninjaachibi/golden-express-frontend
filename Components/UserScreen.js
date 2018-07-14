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

class UserScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Users',
    headerRight: <Button title='Messages' onPress={ () => {navigation.state.params.onRightPress()} } />
  });
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    };
    this.onRightPress = this.onRightPress.bind(this);
  }

  onRightPress() {
    this.props.navigation.navigate('Messages');
  }
  componentDidMount() {
    this.props.navigation.setParams({
      onRightPress: this.onRightPress
    })

    fetch('https://hohoho-backend.herokuapp.com/users', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      /* do something with responseJson and go back to the Login view but
      * make sure to check for responseJson.success! */
      console.log(responseJson)
      if (responseJson.success)
      {
        this.setState({dataSource:this.ds.cloneWithRows(responseJson.users)})
      }

    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log(err)
      this.setState({message:err})
    });
  }
  touchUser(user)
  {
    fetch('https://hohoho-backend.herokuapp.com/messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: user._id,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      /* do something with responseJson and go back to the Login view but
      * make sure to check for responseJson.success! */
      console.log(responseJson)
      if (responseJson.success)
      {
        Alert.alert(
          'Success','LOL'
          ,
          [{text: `Your HoHoHo to ${user.username} has been sent!`}] // Button
        )
      }

      else {
        Alert.alert(
          'Fail','LOL'
          ,
          [{text: `Your HoHoHo to ${user.username} has not been sent!`}] // Button
        )

      }

    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log(err)
      this.setState({message:err})
    });

  }

  render() {
    return (<View style={{backgroundColor:'gold',flex:1, justifyContent:'center',alignItems:'center'}}><ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) =><TouchableOpacity onPress={this.touchUser.bind(this,rowData)}> <Text style={{fontSize:45, color:'black'}}>{rowData.username}</Text></TouchableOpacity>}
    /></View>)
  }
}

export default UserScreen;
