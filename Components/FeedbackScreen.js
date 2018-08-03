import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Button
} from 'react-native';
import styles from './Styles'

import { FormLabel, FormInput, FormValidationMessage, Rating } from 'react-native-elements'


class FeedbackScreen extends React.Component {
  static navigationOptions ={
    title: 'Feedback'
  };

  constructor() {
    super();
    this.state = {
      Name:'',
      phoneNumber:'',
      question:'',
      rating:0
    }
  }

  press() {
    alert('success')
    this.props.navigation.navigate('Register');
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
    this.setState({rating:rating})
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{
        flex:1,
      }}>
        <FormLabel>Name</FormLabel>

        <FormInput placeholder='Please enter your name...' onChangeText={(text)=>this.setState({Name: text})}/>
        <FormLabel>Phone Number</FormLabel>
        <FormInput placeholder='Please enter your phone number...' onChangeText={(text)=>this.setState({phoneNumber: text})}/>
        <FormLabel>Question</FormLabel>
        <FormInput placeholder='Please enter your question...' onChangeText={(text)=>this.setState({question: text})}/>
      </ScrollView>


       <View>
         <Text>Please rate </Text>
        <Rating
           showRating
           type="star"
           fractions={1}
           startingValue={2.5}
           imageSize={40}
           onFinishRating={(score)=>this.setState({rating:score})}
           style={{ paddingVertical: 10 }}
/>
        </View>

        <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default FeedbackScreen;
