const React = require('react');
const ReactRedux = require('react-redux');

const CartActions = require('actions/cart.js');

require('./style.css');

let {connect} = ReactRedux;

class CartButton extends React.PureComponent {  
  render(){
    return (
      <button className={['cart-button', this.props.className].filter(v => v).join(' ')} onClick={e => {e.stopPropagation(); this.props.addToCart(this.props.data);}}>{this.props.inCartQuantity ? (
        <span className="d-flex mx-n1">
          <span className="px-1 text-nowrap">One more</span>
          <span className="px-1">
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
  async addToCart({id, price}){
    CartActions.setPosition({id, price});
    let cart = await CartActions.getState();
    dispatch({type: 'INIT_CART', data: cart});
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(CartButton);