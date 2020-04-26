const QueryString = require('querystring');
const QS = require('qs');

const API = {
  Cart: require('api/cart.js'),
  Order: require('api/order.js'),
  Catalog: require('api/catalog.js'),
  Config: require('api/config.js')
}

const Actions = {
  async getState(){
    let cart = API.Cart, config, goods, deliveryGood, changedPositions;
    
    config = await API.Config.get();
    goods = await API.Catalog.getList({
      filters: Object.values(cart.positions).map(({id}) => ({id})).concat({type: 'delivery'}),
      select: ['id', 'name', 'type']
    });
    deliveryGood = Object.values(goods).find(good => good.type === 'delivery');
    
    if(!cart.currency)
      cart.setCurrency(Object.values(config.currencies)[0].id);
    
    if(Object.values(cart.positions).some(({currency}) => currency !== cart.currency)){
      changedPositions = Object.values(cart.positions)
        .map(({id, price}) => ({
          id, 
          price: price ? goods[id].prices[config.currencies[cart.currency].code] : price
        }));
      cart.setPositions(changedPositions, false);
    }

    if(deliveryGood){
      if(cart.positionsCount){
        cart.setPosition({
          id: deliveryGood.id, 
          price: 0,
          quantity: 1, 
          editable: false
        }, false);
        if(cart.subTotal < config.currencies[cart.currency].deliveryMinPrice){
          cart.setPosition({
            id: deliveryGood.id, 
            price: deliveryGood.prices[config.currencies[cart.currency].code]
          }, false);
        }
      } else {
        cart.deletePosition(deliveryGood.id);
      }
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
      currencies: config.currencies,
      subTotal: cart.subTotal,
      total: cart.total,
      positionsCount: cart.positionsCount
    };
  },
  getData(){
    let cart = API.Cart;
    
    return {
      positions: cart.positions,
      currency: cart.currency,
      subTotal: cart.subTotal,
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
  setCurrency(id){
    API.Cart.setCurrency(id);
  },
  clear(){
    API.Cart.clear();
  },
  async checkout(data){
    data = QS.parse(QueryString.encode(data));
    data.order.positions = API.Cart.positions;
    data.order.currency_id = API.Cart.currency;
    
    return await API.Order.create(data);
  }
}

module.exports = Actions;