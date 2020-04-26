module.exports = (state, action) => {
  switch(action.type){
    case 'INIT_CART':
      return {...state, ...action.data, ...{
        checkoutForm: state.checkoutForm === 'success' || state.checkoutForm === 'error' || (state.checkoutForm === 'visible' && !action.data.checkoutForm && !action.data.positionsCount) ? 'hidden' : action.data.checkoutForm || state.checkoutForm
      }};
    case 'SHOW_CHECKOUT':
      return {...state, ...{
        checkoutForm: 'visible'
      }};
    case 'HIDE_CHECKOUT':
      return {...state, ...{
        checkoutForm: 'hidden'
      }};
    default:
      return {
        positions: {},
        currency: '',
        currencies: {},
        deliveryMinPrices: {},
        total: 0,
        subTotal: 0,
        positionsCount: 0,
        visible: false,
        checkoutForm: 'hidden',
        checkoutProcess: false,
      }
  }
};