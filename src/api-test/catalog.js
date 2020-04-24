const Provider = require('@jfxteam/provider');

require('data/goods.json');

class Catalog {
  static provider = new Provider;
    
  static async getList({filters}){
    filters = filters || {};

    let goods = await this.provider.get({url: '/data/goods.json', responseHandler: r => r.json()});
      
    return Object.entries(goods)
    .reduce((obj, [id, good]) => {
      let checkFilter = filters.some(filter => !Object.entries(filter).some(([key, value]) => good[key] !== value));
      
      if(checkFilter)
        obj[id] = {
          id: good.id,
          name: good.name,
          description: good.description,
          prices: good.prices,
          type: good.type,
          image: good.image,
          active: good.active,
        }
      return obj;
    }, {});
  }
  
  static async getGood(filter){
    let list = await this.getList({
      filters: [filter]
    });
    return Object.values(list)[0];
  }
}

module.exports = Catalog;