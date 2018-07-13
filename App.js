import React from 'react';
import { TouchableOpacity,StyleSheet, Text, View, ListView, Image} from 'react-native';
var _ = require('underscore');
import { StackNavigator } from 'react-navigation';

class App extends React.Component {
  static navigationOptions= (props) =>({
    title:'Home Page',
    headerRight: <TouchableOpacity onPress={()=>props.navigation.navigate('Page2')}><Text>Second Page</Text></TouchableOpacity>

  })
  constructor(){
    super()

    this.state = {
      poem:"loading",
      number:'loading',
      products:[]
    };

  }

//   componentDidMount(){
//     // fetch("https://horizons-json-cors.s3.amazonaws.com/poem.txt")
//     // .then(resp=>resp.text())
//     // .then(json=>{var removePunctuation = json.replace(/[!,?.":;]/g,' ');
//     // var split = removePunctuation.split(" ");
//     // this.setState({number:split.length})})
//     // .catch(err=>console.log(err))
//     fetch("https://horizons-json-cors.s3.amazonaws.com/products.json")
//     .then(resp=>resp.json())
//     .then(resp => {resp.forEach((product)=>{
//       fetch(product.url).then(resp=>resp.json())
//       .then(resp=>{
//         var copy = this.state.products.slice()
//         copy.push(resp)
//         this.setState({products:copy})
//
//       })
//       .catch(err=>console.log(err))
//     })} )
//
//   }
//
// press(item)
// {
//   this.setState({numbers:this.state.numbers.filter((curItem)=>(item!==curItem))})
// }
// add()
// {
//   var nums = this.state.numbers
//
//   this.setState({numbers:nums.concat([nums[nums.length-1]+1])})
// }
//
// remove()
// {
//   var nums = this.state.numbers
//   nums.pop()
//   this.setState({numbers:nums})
// }

  render() {
    // console.log(this.state.products)
    // var dataSource = new ListView.DataSource({
    //   rowHasChanged:(r1,r2)=>(r1 !==r2)
    // });

    //   <View style ={{flex:1}}>
    //   <View style={{backgroundColor:'red',
    //     flex:1,
    //     alignItems:'center',
    //     justifyContent:'center'
    //   }}>LOL
    // </View>
    //   <View style = {{flex:2,
    //      alignItems:'center',
    //      justifyContent:'center',
    //       backgroundColor:'blue'
    //     }}>
    //   </View>
    //   </View>
    //     <View style ={{flex:1,backgroundColor:'gold', justifyContent:'center',alignItems:'center'}}>
    //       {this.state.show ?  <TouchableOpacity style ={{
    //         alignItems:'center',
    //          justifyContent:'center'
    //          ,backgroundColor:'red',height:60,width:60
    //        }} onPress={this.appear.bind(this)}>
    //        </TouchableOpacity>:  <TouchableOpacity style ={{
    //          alignItems:'center',
    //           justifyContent:'center',
    //           height:60,
    //           width:60
    //
    //         }} onPress={this.appear.bind(this)}>
    //         </TouchableOpacity>}
    // </View>
    //     );
    //   }
    // }
    //
    // <View style ={{justifyContent:'center',
    //   flex:1,
    //   alignItems:'center'}}>
    // <TouchableOpacity onPress={this.up.bind(this)}><Text style ={{fontSize:60}}>Up</Text></TouchableOpacity>
    // <Text style ={{fontSize:60}}>{this.state.num}</Text>
    // <TouchableOpacity  onPress = {this.down.bind(this)}><Text style ={{fontSize:60}}>Down</Text></TouchableOpacity>
    // </View>
    // return  (<View style ={{marginTop:20,flex:1,justifyContent:'center', alignItems:'center'}}>
    //   <TouchableOpacity onPress={this.add.bind(this)}><Text style={{fontSize:40}}>Add</Text></TouchableOpacity>
    //   <TouchableOpacity onPress={this.remove.bind(this)} ><Text style={{fontSize:40}}>Remove</Text></TouchableOpacity>
    //
    //   <ListView renderRow=
    //     {(item) =>(<View style ={{alignItems:'center'}}>
    //       <TouchableOpacity onPress={this.press.bind(this,item)}><Text>{item}</Text></TouchableOpacity>
    //     </View>)}
    //     dataSource = {dataSource.cloneWithRows(this.state.numbers)}/>
    //   </View>
    // )
    // return (<View style ={{justifyContent:'center',
    //   flex:1,
    //   alignItems:'center',backgroundColor:'gold'}}>
    //
    // {this.state.products.map(product=><View><Text style={{fontSize:30}}>{product.name}: {product.priceCents/100}</Text></View>)}</View>)}
    return (<View style ={{justifyContent:'center',
      flex:1,
      alignItems:'center',backgroundColor:'gold'}}> <TouchableOpacity onPress={()=> (this.props.navigation.navigate('Page2'))}><Image style={{flex:1, height: undefined, width: undefined}} source= {require('./Images/Trump.jpeg')}/></TouchableOpacity></View>)
  }
  }

class Second extends React.Component{
  static navigationOptions= (props) =>({
    title:'Second Page',
    headerRight: <TouchableOpacity onPress={()=>props.navigation.navigate('Page3')}><Text>Third Page</Text></TouchableOpacity>

  })
  render()
  {
    return (<View style ={{justifyContent:'center',
      flex:1,
      alignItems:'center',backgroundColor:'silver'}}> <TouchableOpacity onPress={()=> (this.props.navigation.navigate('Page3'))}><Text style={font.font}>SECOND PAGE</Text></TouchableOpacity></View>);
  }

}

class Third extends React.Component{
  static navigationOptions= (props) =>({
    title:'Third Page',
    headerLeft: <TouchableOpacity onPress={()=>props.navigation.navigate('Page2')}><Text>Second Page</Text></TouchableOpacity>


  })
  render()
  {
    return (<View style ={{justifyContent:'center',
      flex:1,
      alignItems:'center',backgroundColor:'turquoise'}}> <TouchableOpacity onPress={()=>this.props.navigation.navigate('Page2')}><Text style ={font.font}>Third PAGE</Text></TouchableOpacity></View>);
  }

}
  const Navigator = StackNavigator({
    Home:{screen:App},
    Page2:{screen:Second},
    Page3:{screen:Third}
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  const font = StyleSheet.create({
    font: {
      fontSize:60
    },
  });
export default Navigator;
