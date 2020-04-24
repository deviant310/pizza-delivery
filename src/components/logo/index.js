const React = require('react');
const Router = require('react-router-dom');

let {withRouter, Link} = Router;

let img = require('img/logo.svg');

require('./style.css');

class Logo extends React.Component {
  render(){
    let logoImg = (
      <div className="logo__img" style={{backgroundImage: `url(${img.default})`}}></div>  
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