import React from 'react';
import {
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
  import { StackNavigator} from 'react-navigation';
  import { Icon } from 'react-native-elements'

  import LeaderBoardScreen from './LeaderBoard'

  export default class ScoreNavigator extends React.Component{
    constructor(props)
    {
      super(props);
      this.state = {

      }
    }

    render(){
        const stack={
            LeaderBoard :{
                screen: LeaderBoardScreen
            }
        }

        const ScoreStack = StackNavigator(stack,{initialRouteName:'LeaderBoard',
        headerMode:'screen',
        navigationOptions: {
          headerVisible: true,
          headerLeft: <Icon name='chevron-left' size={35} color={'blue'}
          onPress={()=>{this.props.navigation.goBack()}}/>
        }
    })

    return(
        <View style={{flex:1}}>
            <ScoreStack />
        </View>
    )

    }
  }
