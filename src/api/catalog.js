const Provider = require('@jfxteam/provider');

class Catalog {
  static provider = new Provider;
    
  static async getList({filters, select}){
    filters = filters || {};

    let request = await this.provider.get({
        url: '/api/?com=catalog&act=get.list',
        type: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({filters, select}),
        responseHandler: r => r.json()
      }),
      goods = request.response;
      
    return Object.values(goods)
    .reduce((obj, good) => {
      obj[good.id] = {
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