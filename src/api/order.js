class Order {    
  static async create(order){   
    let request = await fetch('/api/?com=order&act=create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
    .then(r => r.json())
      
    return request.response;
  }
}

module.exports = Order;