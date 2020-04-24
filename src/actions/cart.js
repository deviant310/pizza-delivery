const Config = require('config');

const API = {
  Cart: require('api/cart.js'),
  Catalog: require('api/catalog.js')
}

const Actions = {
  init: async () => {
    let cart = API.Cart, goods, changedPositions, deliveryGoodId = 134334;
    
    goods = await API.Catalog.getList({
      filters: Object.values(cart.positions).map(({id}) => ({id})).concat({id: deliveryGoodId})
    });
    
    if(Object.values(cart.positions).some(({currency}) => currency !== cart.currency)){
      changedPositions = Object.values(cart.positions)
        .map(({id, price}) => ({id, price: price ? goods[id].prices[cart.currency] : price}));
      cart.setPositions(changedPositions, false);
    }

    if(cart.positionsCount){
      if(cart.subTotal < Config.freeDeliveryMinPrices[cart.currency]){
        cart.setPosition({
          id: deliveryGoodId, 
          price: goods[deliveryGoodId].prices[cart.currency],
          quantity: 1, 
          editable: false
        }, false);
      } else {
        cart.setPosition({
          id: deliveryGoodId, 
          price: 0
        }, false)
      }
    } else {
      cart.deletePosition(deliveryGoodId);
    }

    return {
      positions: Object.entries(cart.positions).reduce((obj, [id, position]) => {
        obj[id] = {
          id: position.id,
          name: goods[id].name,
          type: goods[id].type,
          price: position.price,
          quantity: position.quantity,
          editable: position.editable
        }
        return obj;
      }, {}),
      currency: cart.currency,
      subtotal: cart.subTotal,
      total: cart.total,
      positionsCount: cart.positionsCount
    };
  },
  setPositionQuantity(id, quantity){
    API.Cart.setPosition({id, quantity});
  },
  setPosition({id, price}){
    API.Cart.setPosition({id, price});
  },
  deletePosition(id){
    API.Cart.deletePosition(id);
  },
  setCurrency(code){
    API.Cart.setCurrency(code);
  }
}

module.exports = Actions;