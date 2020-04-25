const React = require('react');
const Router = require('react-router-dom');

let {withRouter, Link} = Router;

require('./style.css');

class Logo extends React.Component {
  render(){
    let logoImg = (
      <div className="logo__img"></div>  
    );
    
    return (
      <div className={['logo', this.props.className].filter(v => v).join(' ')}>
        {this.props.location.pathname !== '/' ? (
          <Link className="logo__link" to="/">{logoImg}</Link>
        ) : (
          <div>{logoImg}</div>
        )}
      </div>
    );
  }
}

module.exports = withRouter(Logo);