class Config {    
  static async get(order){   
    let request = await fetch('/api/?com=config&act=get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json()),
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