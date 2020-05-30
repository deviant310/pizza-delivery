const Provider = require('@jfxteam/provider');

require('data/config.json');

class Config {
  static provider = new Provider;
  
  static async get(order){
    let config = await this.provider.get({url: '/data/config.js', responseHandler: r => r.json()});

    return {
      currencies: Object.values(config.currencies).reduce((obj, currency) => {
        obj[currency.id] = {
          id: currency.id,
          code: currency.name,
          deliveryMinPrice: currency.delivery_min_price
        }
        return obj;
      }, {})
    }
  }
}

module.exports = Config;