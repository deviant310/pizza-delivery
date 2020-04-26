const Provider = require('@jfxteam/provider');

class Config {
  static provider = new Provider;
  
  static async get(order){
    let request = await this.provider.get({
        url: '/api/?com=config&act=get',
        type: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        responseHandler: r => r.json()
      }),
      response;
      
    response = request.response;
    return {
      currencies: Object.values(response.currencies).reduce((obj, currency) => {
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