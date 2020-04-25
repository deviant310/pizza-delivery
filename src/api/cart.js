const LS = require('local-storage');

if(!LS('__cart'))
  LS('__cart', {
    positions: {},
    currency: ''
  });

class Cart {  
  static get positions(){
    let cart = LS('__cart');
    return Object.entries(cart.positions).reduce((obj, [id, position]) => {
      obj[id] = {
        id: position.id,
        price: position.price,
        quantity: position.quantity,
        currency: position.currency,
        editable: position.editable,
      };
      return obj;
    }, {})
  }
  
  static get currency(){
    let cart = LS('__cart');
    return cart.currency;
  }
  
  static get subTotal(){
    let cartStorage = LS('__cart'),
      {positions} = cartStorage;
    return +Object.values(positions).reduce((total, position) => total+= position.editable ? (position.price * position.quantity) : 0, 0).toFixed(2);
  }
  
  static get total(){
    let cartStorage = LS('__cart'),
      {positions} = cartStorage;
    return +Object.values(positions).reduce((total, position) => total+= position.price * position.quantity, 0).toFixed(2);
  }
  
  static get positionsCount(){
    let cartStorage = LS('__cart'),
      {positions} = cartStorage;
    return Object.values(positions).reduce((total, position) => total+= position.editable ? position.quantity : 0, 0);
  }
  
  static setPositions(positions, updateQuantity = true){
    if(!positions || !positions.length)
      throw new Error('positions is required!');
    
    let cartStorage = LS('__cart'),
      {currency} = cartStorage,
      ret = [];
    
    positions.map(({id, price, quantity, editable}) => {
      if(!id)
        throw new Error('id is required!');
      
        let existedPosition = cartStorage.positions[id], 
        finalPrice = typeof(price) !== 'undefined' ? price : (existedPosition ? existedPosition.price : 0),
        finalQuantity = (existedPosition ? existedPosition.quantity : (!updateQuantity ? quantity : 0)) + (updateQuantity ? quantity || 1 : 0),
        finalEditable = typeof(editable) !== 'undefined' ? editable : (existedPosition ? existedPosition.editable : true),
        position, deletedPosition;
        
      if(finalQuantity > 0){
        position = {...existedPosition, ...{
          id: id,
          price: finalPrice,
          quantity: finalQuantity,
          currency: currency,
          editable: finalEditable,
        }};
        cartStorage.positions[id] = position;
        ret = ret.concat({inCart: true, position});
      } else {
        delete cartStorage.positions[id];
        ret = ret.concat({inCart: false, deletedId: id});
      }
    })
    
    LS('__cart', cartStorage);
    return ret;
  }
  
  static setPosition({id, price, quantity, editable}, updateQuantity = true){
    let positions = this.setPositions([{id, price, quantity, editable}], updateQuantity);
    return positions[0];
  }
  
  static deletePosition(id){
    if(!id)
      throw new Error('id is required!');
    
    let cartStorage = LS('__cart');
    
    if(cartStorage.positions[id]){
      delete cartStorage.positions[id];
      LS('__cart', cartStorage);
    }
    
    return {id};
  }
  
  static setCurrency(code){
    if(!code)
      throw new Error('code is required!');
    
    let cartStorage = LS('__cart');
    cartStorage.currency = code;
    LS('__cart', cartStorage);
    return code;
  }
}

module.exports = Cart;