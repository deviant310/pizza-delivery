module.exports = (state, action) => {
  switch(action.type){
    case 'INIT_CART':
      return {...state, ...action.data, ...{
        checkoutStatus: false,
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
    case 'PROCESS_CHECKOUT':
      return {...state, ...{
        checkoutProcess: true,
      }};
    case 'SUCCESS_CHECKOUT':
      return {...state, ...{
        checkoutStatus: 'success',
        checkoutProcess: false,
      }};
    case 'ERROR_CHECKOUT':
      return {...state, ...{
        checkoutStatus: 'error',
        checkoutProcess: false,
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
        checkoutIsVisible: false,
        checkoutStatus: false,
        checkoutProcess: false,
      }
  }
};