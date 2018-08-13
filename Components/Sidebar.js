import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './Sidebar.style';
import PropTypes from 'prop-types';
class DrawerContent extends Component {



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
           title='X'
           buttonStyle={styles.button}
           onPress={this.navigateToScreen('Three')}/>
        <Button
         raised
         icon={{name: 'umbrella', type: 'font-awesome', size: 20}}
         title='Four'
         buttonStyle={styles.button}
         onPress={this.navigateToScreen('One')}/>
        <Button
         raised
         icon={{name: 'user-circle', type: 'font-awesome', size:20}}
         title='Five'
         buttonStyle={styles.button}
         onPress={this.navigateToScreen('Order')}/>
        </ScrollView>
      </View>
    );
  }
}
DrawerContent.propTypes = {
  navigation: PropTypes.object
};
export default DrawerContent;
