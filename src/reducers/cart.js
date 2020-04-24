module.exports = (state, action) => {
  switch(action.type){
    case 'INIT_CART':
      return {...state, ...action.data}
    default:
      return {
        positions: {},
        currency: 'USD',
        total: 0,
        positionsCount: 0,
        visible: false
      }
  }
};