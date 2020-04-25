const React = require('react');
const ReactRedux = require('react-redux');

const CartActions = require('actions/cart.js');

const Lang = require('i18n/en.json');

require('./style.css');

let {connect} = ReactRedux;

class CartPosition extends React.PureComponent {
  render(){
    let {id, name, price, quantity, currency, editable} = this.props,
      {currenciesSymbols} = Lang,
      currencySymbol = currenciesSymbols[currency];
      
    return (
      <div className="cart-position d-table-row">
        <div className="cart-position__name d-table-cell px-3 align-top text-nowrap">{name}</div>
        <div className="d-table-cell px-3 align-top">
          {editable && (
          <div className="row flex-nowrap align-items-center mx-n1 text-center">
            <i className="cart__control fas fa-caret-down col px-1" onClick={e => {e.stopPropagation(); this.props.setPositionQuantity(id, -1)}}></i>
            <div className="cart-position__quantity col px-0">{quantity}</div>
            <i className="cart__control fas fa-caret-up col px-1" onClick={e => {e.stopPropagation(); this.props.setPositionQuantity(id, 1)}}></i>
          </div>
          )}
        </div>
        {editable ? (
        <div className="cart-position__price d-table-cell align-top text-right">{currencySymbol}{price}</div>  
        ) : (
        <div className="d-table-cell"></div>
        )}
        {editable ? (
        <div className="d-table-cell px-3 align-top text-right">
          <i className="cart__control cart__remove-control fal fa-times" onClick={e => {e.stopPropagation(); this.props.deletePosition(id)}}></i>
        </div>
        ) : (
        <div className="cart-position__price d-table-cell pr-3 align-top text-right">{currencySymbol}{price}</div> 
        )}
      </div>
                      
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...state.positions[props.id], 
  ...{
    currency: state.currency ? state.currencies[state.currency].code : '',
  }
});

const mapDispatchToProps = dispatch => ({
  async initCart(){
    let cart = await CartActions.init();
    dispatch({type: 'INIT_CART', data: cart});
  },
  setPositionQuantity(id, quantity){
    CartActions.setPositionQuantity(id, quantity);
    this.initCart();
  },
  deletePosition(id){
    CartActions.deletePosition(id);
    this.initCart();
  },
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(CartPosition);