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
    title: 'GroceryList'
  };
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      groceries: this.props.navigation.getParam('groceries') ? this.props.navigation.getParam('groceries') : [],
      text: '',
    }
    this.strikeThrough = this.strikeThrough.bind(this)
    this.deleteAllStriked = this.deleteAllStriked.bind(this)
  }

  componentDidMount() {
  }

  strikeThrough (i) {
    console.log('striked through', i);
    let groceries = this.state.groceries.slice();
    console.log('copy of groceries', groceries);
    groceries[i].striked = ! !!groceries[i].striked;
    this.setState({groceries: groceries});
  }

  deleteAllStriked() {
    AsyncStorage.setItem('groceries', JSON.stringify(this.state.groceries.filter((item)=> !item.striked)))
      .then(()=>{
        console.log('delete all striked in AsyncStorage');
        this.setState({
          groceries: this.state.groceries.filter((item)=> !item.striked)
        })
      })
  }

  addToGroceryList() {
    //need to autofill and somehow connect with the api
    AsyncStorage.setItem('groceries', JSON.stringify(this.state.groceries.concat({name: this.state.text})))
    .then(() => {
      console.log('add grocery to AsyncStorage');
      this.setState({
        groceries: this.state.groceries.concat({name: this.state.text}),
      })
    })
  }

  render() {
    let dataSource = this.ds.cloneWithRows(this.state.groceries);
    console.log('grocery list:', this.state.groceries);
    return (
      <View style={styles.container}>
          <Text>Hello world</Text>
          <TextInput
            style={{height: 40}}
            placeholder="Add an ingredient"
            onChangeText={(text) => this.setState({text: text})}
          />
          <TouchableOpacity onPress={ () => {this.addToGroceryList()} } style={[styles.button, styles.buttonGreen, {marginBottom: 30}]}>
            <Text style={styles.buttonLabel}>Add</Text>
          </TouchableOpacity>
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
