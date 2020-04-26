const React = require('react');

const CatalogItem = require('components/catalog-item');

const API = {
  Catalog: require('api/catalog.js')
}

require('./style.css');

class Catalog extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      goods: {},
    };
  }
  
  async componentDidMount(){
    let goods = await API.Catalog.getList({
      filters: [{type : 'product'}]
    });
    
    this.setState({...this.state, ...{
      goods: Object.entries(goods).reduce((obj, [id, good]) => {
        obj[id] = {
          id: good.id,
          name: good.name,
          description: good.description,
          prices: good.prices,
          image: good.image,
        }
        return obj;
      }, {})
    }});
  }
  
  render(){
    return (
      <div className="catalog">
        <div className="catalog__list row">
          {Object.values(this.state.goods).map(({id, name, prices, image, description, currency, inCartQuantity}) => (
            <div className="col-lg-3 mb-5 d-flex" key={id}>
              <CatalogItem data={{id, name, prices, image, description, currency, inCartQuantity}}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

module.exports = Catalog;