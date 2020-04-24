const Provider = require('@jfxteam/provider');

require('data/products.json');

class Catalog {
  static provider = new Provider;
    
  static getList(){
    return this.provider.get({
      url: '/data/products.json',
      responseHandler: r => r.json()
    })
  }
}

module.exports = Catalog;