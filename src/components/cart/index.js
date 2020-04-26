const React = require('react');
const Router = require('react-router-dom');
const ReactRedux = require('react-redux');
const ParseJSONTemplate = require('json-templater/string');
const ReactStringReplace = require('react-string-replace');

const PopUp = require('components/popup');
const CartPosition = require('components/cart-position');
const CheckoutForm = require('components/checkout-form');

const CartActions = require('actions/cart.js');

const Lang = require('i18n/en.json');

require('./style.css');

let {Link} = Router;
let {connect} = ReactRedux;

class Cart extends React.PureComponent {
  constructor(props){
    super(props);
    
    this.popup = React.createRef();
  }
  
  componentDidMount(){
    this.props.initCart();
  }
  
  popupToggle(){
    this.popup.current.toggle();
  }
  
  popupClose(){
    this.popup.current.close();
  }
  
  render(){
    let {className, visible, checkoutIsVisible, positionsCount, positions, currency, currencies, subTotal, total} = this.props,
      {currenciesSymbols, deliveryFree, noCartItems} = Lang,
      currencySymbol = currency ? currenciesSymbols[currencies[currency].code] : '';

    return (
      <div className={['cart', visible ? 'cart--visible' : '', className].filter(v => v).join(' ')}>
        <div className="cart__toggle d-flex align-items-start" onClick={e => {e.stopPropagation(); this.popupToggle();}}>
          <i className="cart__icon fas fa-shopping-cart"></i>
          {positionsCount > 0 && (
            <span className="cart__counter d-flex justify-content-center align-items-center">{positionsCount}</span>
          )}
        </div>
        <PopUp className="cart__popup" fixed={true} ref={this.popup}>
          <div className="cart__container p-4">
            <div className="px-3 py-1 overflow-hidden">
              <div className="d-flex mx-n5 justify-content-between align-items-center mb-4 flex-nowrap">
                <div className="px-5">
                  <h4 className="text-nowrap m-0">Your order</h4>
                </div>
                <div className="px-5">
                  <select className="cart__currency form-control" value={this.props.currency} onChange={e => this.props.setCurrency(+e.target.value)}>
                    {Object.entries(currencies).map(([id, {code}]) => (
                      <option key={id} value={id}>{code} {currenciesSymbols[code]}</option>
                    ))}
                  </select>
                </div>
              </div>
              {positionsCount ? (
                <React.Fragment>
                  <div className="cart__positions mx-n3">
                    <div className="d-table w-100">
                      {Object.values(positions).filter(({editable}) => editable).map(({id}) => (
                        <CartPosition key={id} id={id}/>
                      ))}
                    </div>
                  </div>
                  <hr/>
                  <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>{currencySymbol}{subTotal}</span>
                  </div>
                  <div className="cart__positions mx-n3">
                    <div className="d-table w-100">
                      {Object.values(positions).filter(({editable}) => !editable).map(({id}) => (
                        <CartPosition key={id} id={id}/>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <small>
                {ReactStringReplace(noCartItems.text, '{{link}}', (match, i) => (
                  <Link className="text-underline" to="/menu" key={i} onClick={e => {e.stopPropagation(); this.popupClose();}}>{noCartItems.linkText}</Link>
                ))}
                </small>
              )}
              <div className="d-flex justify-content-between my-3">
                <b>Total:</b>
                <b>{currencySymbol}{total}</b>
              </div>
              <small>
              {ParseJSONTemplate(deliveryFree.text, {
                sums: Object.entries(currencies)
                  .map(([id, {code, deliveryMinPrice}]) => `${currenciesSymbols[code]}${deliveryMinPrice}`)
                  .join(` ${deliveryFree.multipleSumsGlueText} `)
              })}
              </small>
              {this.renderCheckout()}
            </div>
          </div>
        </PopUp>
      </div>
    );
  }
  
  renderCheckout(){
    let {checkoutSuccess, checkoutError} = Lang,
      {checkoutForm, positionsCount} = this.props;
    
    switch(checkoutForm){
      case 'success': return (
        <div className="mt-5 mb-4">
          <div className="alert alert-success" role="alert">{checkoutSuccess}</div>
        </div>
      );
      case 'error': return (
        <div className="mt-5 mb-4">
          <div className="alert alert-danger" role="alert">{checkoutError}</div>
          <div className="d-flex justify-content-center mt-4 mb-3">
            <button className="btn btn-primary" onClick={e => {e.stopPropagation(); this.props.showCheckout()}}>Try again</button>
          </div>
        </div>
      );
      case 'visible': return (
        <div className="mt-5 mb-4">
          <CheckoutForm 
            title="Checkout" 
            submitText="Checkout" 
            onSubmit={(event, originalEvent) => {
              originalEvent.stopPropagation();
              event.preventDefault(); 
              this.props.checkoutSubmit(event.detail);
            }}
          />
        </div>
      );
      case 'hidden': return (positionsCount > 0 &&
        <div className="mt-5 mb-4">
          <div className="d-flex justify-content-center mt-4 mb-3">
            <button className="btn btn-primary" onClick={e => {e.stopPropagation(); this.props.showCheckout()}}>Checkout</button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  async initCart(){
    let cart = await CartActions.getState();
    dispatch({type: 'INIT_CART', data: cart});
  },
  setCurrency(id){
    CartActions.setCurrency(id);
    this.initCart();
  },
  showCheckout(){
    dispatch({type: 'SHOW_CHECKOUT'});
  },
  async checkoutSubmit(data){
    dispatch({type: 'INIT_CART', data: {
      checkoutProcess: true,
    }});
    
    let order = await CartActions.checkout(data);
    
    if(order.order_id){
      CartActions.clear();
      let cart = CartActions.getData();
      
      dispatch({type: 'INIT_CART', data: {...cart, ...{
        checkoutProcess: false,
        checkoutForm: 'success',
      }}});
    } else {
      dispatch({type: 'INIT_CART', data: {
        checkoutProcess: false,
        checkoutForm: 'error',
      }});
    }
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Cart);