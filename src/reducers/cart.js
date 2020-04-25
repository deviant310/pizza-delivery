module.exports = (state, action) => {
  switch(action.type){
    case 'INIT_CART':
      return {...state, ...action.data, ...{
        checkoutIsVisible: state.checkoutIsVisible && !action.data.positionsCount ? false : state.checkoutIsVisible
      }};
    case 'SHOW_CHECKOUT':
      return {...state, ...{
        checkoutIsVisible: true
      }};
    case 'HIDE_CHECKOUT':
      return {...state, ...{
        checkoutIsVisible: false
      }};
    default:
      return {
        positions: {},
        currency: '',
        currencies: {},
        deliveryMinPrices: {},
        total: 0,
        positionsCount: 0,
        visible: false,
        checkoutIsVisible: false
      }
  }
};