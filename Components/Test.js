// constructor(props) {
//   super(props);
//   this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//   this.state = {
//     items: this.ds.cloneWithRows([]),
//     itemsOn: false,
//     currentItem: null,
//   }
// }
//
// componentDidMount() {
//   let groceryItems = this.props.navigation.getParam('groceryItems', [])
//   console.log('passed in items', groceryItems);
//   this.setState({items: this.ds.cloneWithRows(groceryItems)})
// }
//
// //display components for every grocery item with the id passed in as the prop itemId
// displayItem (item) {
//   console.log('item is', item); //may need to change this to a fetch request?
//   this.setState({
//     itemsOn: true,
//     currentItem: item
//   })
// }
//
// async addToCart (item) {
//   // console.log('adding to cart', item);
//   try {
//     let cart = await AsyncStorage.getItem('cart', (err,res)=> {if(err)console.log('err',err);});
//     cart = JSON.parse(cart);
//     console.log('cart is',cart);
//     if(!cart) {
//       cart = {}
//     }
//       cart[item._id] = !!cart[item._id] ? {count: ++cart[item._id].count, item} : {count: 1, item};
//       await AsyncStorage.setItem('cart', JSON.stringify(cart));
//       console.log("added to cart", cart);
//   }
//   catch(err) {
//     console.log(err);
//   }
// }
