const React = require('react');

const Logo = require('components/logo');
const Menu = require('components/menu');
const Cart = require('components/cart');
const CatalogItem = require('components/catalog-item');

require('./style.css');

class Header extends React.Component {
  constructor(props){
    super(props);
    
    this.stick = React.createRef();
    
    this.state = {
      height: 0,
      picked: false
    }
  }
  componentDidMount(){
    let resizeObserver = new ResizeObserver(entries => {
      Object.values(entries).map(({target}) => {
        this.setState({...this.state, ...{
          height: target.clientHeight
        }});
      })
    });
    resizeObserver.observe(this.stick.current);
    
    window.addEventListener('scroll', e => {
      let picked = pageYOffset !== 0;
      if(this.state.picked !== picked)
        this.setState({...this.state, ...{picked}});
    });
  }
  
  render(){
    return (
      <header className={['header', this.state.picked ? 'header--picked' : '', this.props.className, 'mb-5'].filter(v => v).join(' ')} style={{height: this.state.height}}>
        <div className="header__stick position-fixed" ref={this.stick}>
          <div className="header__container container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="header__left row mx-n4">
                <Logo className="header__logo col px-4 py-2"/>
                <Menu 
                  className="header__menu col px-4" 
                  links={[
                    {to: '/', name: 'Home'},
                    {to: '/menu', name: 'Menu'}
                  ]}
                />
              </div>
              <div className="header__right">
                <Cart className="header__cart"/>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

module.exports = Header;