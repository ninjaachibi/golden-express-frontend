import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, AsyncStorage,AlertIOS } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './Sidebar.style';
import PropTypes from 'prop-types';
class DrawerContent extends Component {
constructor(props){
  super(props)
  this.logout=this.logout.bind(this)
}

async logout(){
  try {
    await AsyncStorage.removeItem('token',(err, token)=> {
    console.log('token',token)});
    AlertIOS.alert("Logout Success!",()=>{
      this.props.screenProps.logout
    })
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
}


navigateToScreen = (route) => () => {
    const navigate = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigate);
  }
render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Button
           raised
           icon={{name: 'close', type: 'font-awesome', size: 20}}
           title='Home'
           buttonStyle={styles.button}
           onPress={this.navigateToScreen('Interface')}/>
        <Button
         raised
         icon={{name: 'umbrella', type: 'font-awesome', size: 20}}
         title='My Account'
         buttonStyle={styles.button}
         onPress={this.navigateToScreen('Account')}/>
        <Button
         raised
         icon={{name: 'user-circle', type: 'font-awesome', size:20}}
         title='My Orders'
         buttonStyle={styles.button}
         onPress={this.navigateToScreen('Order')}/>
        <Button
         raised
         title='Log Out'
         buttonStyle={styles.button}
         onPress={this.logout}/>
        </ScrollView>
      </View>
    );
  }
}
DrawerContent.propTypes = {
  navigation: PropTypes.object
};
export default DrawerContent;
