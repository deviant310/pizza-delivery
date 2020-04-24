const Provider = require('@jfxteam/provider');

require('data/cart.json');

class Cart {
  static provider = new Provider;
    
  static get(){
    return this.provider.get({
      url: '/data/cart.json',
      responseHandler: r => r.json()
    })
    .then(({positions, total, currency, positions_count}) => ({
      positions: positions,
      total: total,
      currency: currency,
      positionsCount: positions_count
    }));
  }
  
  static setPosition(position){
    return Promise.resolve(position);
  }
  
  static deletePosition(id){
    return Promise.resolve(id);
  }
  
  static setCurrency(code){
    
  }
}

module.exports = Cart;