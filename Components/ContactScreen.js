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
  ScrollView,
  AsyncStorage,
  FlatList,
  Image,
  WebView
} from 'react-native';
import _ from 'underscore';
import styles from './Styles';
import {Header, Icon, Card,Avatar} from 'react-native-elements';
// import PaymentInfoScreen from './PaymentInfoScreen'
class ContactScreen extends React.Component {
  static navigationOptions = {
    title:'Account Information',
  };

  constructor(props) {
    super(props);
    this.state = {
      total:0,
      firstName: 'Charles',
      lastName:'Deng',
      email:'Charlesdeng98@gmail.com',
      phoneNumber: '6263742088'
    };
  }

  render() {
    console.log(this.state);
    let { total, cart, paid, confirmed } = this.state;
    return (
      <View style={{flex: 1, alignItems: 'stretch', position:'absolute', top:0,bottom:0,left:0,right:0 }}>
        <ScrollView>
          <View style={{flex:1, justifyContent:'flex-start'}}>
            <Card containerStyle={{height:50, justifyContent:'flex-start'}}>
              <Text style={{marginTop:-11.5, fontSize:12}}> Email Address </Text>
              <Text style={{fontSize:12, fontWeight:'700', marginTop:5}}> {this.state.email} </Text>
            </Card>
          </View>
          <View className="payment-container">
            <Card>
                <View style={styles.inputLabels}>
                <Text style={{fontSize:12}}>First name</Text>
                <Text style={{marginLeft:98,fontSize:12}}>Last name</Text>
              </View>
              <View style={styles.paymentBox}>
                <TextInput
                  placeholder='First name'
                  style={{height: 45,width:152, borderColor: 'gray', borderWidth: 1, padding: 5, paddingTop:15, fontSize:14}}
                  onChangeText={(firstName) => this.setState({firstName})}
                  value={this.state.firstName}/>
                <TextInput
                  placeholder="Last name"
                  style={{height: 45,width:152, borderColor: 'gray', borderWidth: 1, padding: 5,marginLeft:5,paddingTop:15}}
                  onChangeText={(lastName) => this.setState({lastName})}
                  value={this.state.lastName}
                />
              </View>
              <TextInput
                keyboardType={"numeric"}
                placeholder='Phone number'
                style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
                onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                value={this.state.phoneNumber}
              />
            </Card>
          </View>
          </ScrollView>
        </View>

      )
    }
}

export default ContactScreen;
