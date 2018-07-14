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
  AsyncStorage
} from 'react-native';
import styles from './Styles'

class GroceryListScreen extends React.Component{
  static navigationOptions = {
    title: 'Grocery List'
  };
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      groceries: this.props.navigation.getParam('groceries'),
    }
    this.strikeThrough = this.strikeThrough.bind(this)
    this.deleteAllStriked = this.deleteAllStriked.bind(this)
  }

  componentDidMount() {
    //API =>this.props.name=>searches for ingredients and instructors
  }

  strikeThrough (i) {
    console.log('striked through', i);
    let groceries = this.state.groceries.slice();
    console.log('copy of groceries', groceries);
    groceries[i].striked = ! !!groceries[i].striked;
    this.setState({groceries: groceries});
  }

  deleteAllStriked() {
    console.log('delete all striked');
    this.setState({
      groceries: this.state.groceries.filter((item)=> !item.striked)
    })
  }

  render() {
    let dataSource = this.ds.cloneWithRows(this.state.groceries);
    console.log('grocery list:', this.state.groceries);
    return (
      <View style={styles.container}>
          <Text>Hello world</Text>
          <ListView
            dataSource={dataSource}
            style={{marginBottom: 30, width: 100}}
            renderRow={(item,i,j) => (
              <View style={{ borderBottomWidth: 1, width: 100, marginBottom: 10, flexDirection: 'row', flex:1, backgroundColor: "lightblue"}}>

                <TouchableOpacity
                  onPress={()=>{this.strikeThrough(j)}}
                  >
                  {item.striked ?
                    <Text style={{textAlign: "center", textDecorationLine: 'line-through'}}>{item.name}</Text>
                     :
                    <Text style={{textAlign: "center",}}>{item.name}</Text>
                   }
                </TouchableOpacity>

              </View>
            )}
          />
          <View style={{marginBottom: 30}}>
          <Button
            onPress={()=>{this.deleteAllStriked()}}
            title="Delete All Marked Through"
            color="#841584"
          />
        </View>

      </View>

    )
  }
}

export default GroceryListScreen;
