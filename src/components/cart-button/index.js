const React = require('react');
const ReactRedux = require('react-redux');

const CartActions = require('actions/cart.js');

require('./style.css');

let {connect} = ReactRedux;

class CartButton extends React.PureComponent {  
  render(){
    return (
      <button className={['cart-button', this.props.className].filter(v => v).join(' ')} onClick={e => {e.stopPropagation(); this.props.addToCart(this.props.data);}}>{this.props.inCartQuantity ? (
        <span className="row mx-n1">
          <span className="col px-1 text-nowrap">One more</span>
          <span className="col px-1">
            <span className="badge badge-light">{this.props.inCartQuantity}</span>
          </span>
        </span> 
      ) : (
        <span>Buy</span>
      )}
      </button>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    inCartQuantity: state.positions[props.data.id] ? state.positions[props.data.id].quantity : 0,
  }
};

const mapDispatchToProps = dispatch => ({
  async initCart(){
    let cart = await CartActions.init();
    dispatch({type: 'INIT_CART', data: cart});
  },
  addToCart({id, price}){
    CartActions.setPosition({id, price});
    this.initCart();
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(CartButton);