const React = require('react');
const Router = require('react-router-dom');

require('./style.css');

let {Link, withRouter} = Router;

class Menu extends React.PureComponent {
  render(){
    return (
      <nav className={`menu ${this.props.className} d-flex`}>
        <div className="menu__list row mx-n2 flex-nowrap">
          {this.props.links.map(({to, name}, index) => (
            <Link 
              to={to}
              key={index}
              className={`menu__link col px-2 d-flex align-items-center ${this.props.location.pathname === to ? 'active' : ''}`} >{name}
              </Link>
          ))}
        </div>
      </nav>
    );
  }
}

module.exports = withRouter(Menu);