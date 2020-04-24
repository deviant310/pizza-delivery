const React = require('react');
const ReactRedux = require('react-redux');

const CartButton = require('components/cart-button');

const Lang = require('i18n/en.json');

require('./style.css');

let {connect} = ReactRedux;

class CatalogItem extends React.Component {  
  render(){
    let {id, name, description, image} = this.props.data,
      price = this.props.price,
      currency = Lang.currenciesSymbols[this.props.currency];

    return (
      <div className="catalog-item d-flex flex-column w-100">
        <div className="catalog-item__canvas d-flex justify-content-center align-items-center">
          <div className={['catalog-item__img', !image ? 'fad fa-pizza-slice' : ''].filter(v => v). join(' ')} style={{backgroundImage: image ? `url(${image})` : ''}}>
          </div>
        </div>
        <div className="catalog-item__content p-4 text-center d-flex flex-grow-1">
          <div className="row mx-0 my-n2 flex-column flex-grow-1">
            <div className="col px-0 py-2 flex-grow-0">
              <div className="catalog-item__name h5 text-center">{name}</div>
            </div>
            <div className="col px-0 py-3">
              <div className="catalog-item__description">{description}</div>
            </div>
            <div className="col px-0 py-3 flex-grow-0">
              <div className="catalog-item__price">
                <b>{price ? <React.Fragment>{currency}{price}</React.Fragment> : ''}</b>
              </div>
            </div>
            <div className="col px-0 py-2 flex-grow-0 d-flex justify-content-center">
              <CartButton className="catalog-item__btn btn btn-primary px-4" data={{id, price}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currency: state.currency,
  price: props.data.prices[state.currency]
});

module.exports = connect(mapStateToProps)(CatalogItem);