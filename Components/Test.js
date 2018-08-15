// import React, { Component } from 'react';
// import { NavigationActions } from 'react-navigation';
// import { ScrollView, Text, View, AsyncStorage,AlertIOS } from 'react-native';
// import { Button, List, ListItem } from 'react-native-elements';
// import styles from './Sidebar.style';
// import PropTypes from 'prop-types';
//
//
//
// const list = [
//   {route:'Interface',icon:{name: 'close', type: 'font-awesome', size: 20}},
//   {route:'Account', icon:{name: 'user-circle', type: 'font-awesome', size:20}},
//   {route: 'Order',icon:{name: 'umbrella', type: 'font-awesome', size: 20}  }]
// class DrawerContent extends Component {
//
//
//
//
// constructor(props){
//   super(props)
//   this.logout=this.logout.bind(this)
// }
//
// async logout(){
//   try {
//     await AsyncStorage.removeItem('token',(err, token)=> {
//     console.log('token',token)});
//     AlertIOS.alert("Logout Success!",()=>{
//       this.props.screenProps.logout
//     })
//   } catch (error) {
//     console.log('AsyncStorage error: ' + error.message);
//   }
// }
//
//
// navigateToScreen = (route) => () => {
//     const navigate = NavigationActions.navigate({
//       routeName: route
//     });
//     this.props.navigation.dispatch(navigate);
//   }
// render () {
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           <List containerStyle={{marginBottom: 20}}>
//   {
//     list.map((l) => (
//
//       <ListItem
//         roundAvatar
//         titleContainerStyle={{marginLeft:5}}
//         onPress={this.navigateToScreen(l.route)}
//         key={l.route}
//         title={l.route}
//         leftIcon={l.icon}
//       />
//     ))
//   }
// </List>
//         <Button
//          raised
//          title='Log Out'
//          buttonStyle={styles.button}
//          onPress={this.logout}/>
//         </ScrollView>
//       </View>
//     );
//   }
// }
// DrawerContent.propTypes = {
//   navigation: PropTypes.object
// };
// export default DrawerContent;
