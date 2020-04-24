const React = require('react');

require('./style.css');

module.exports = React.memo(({className}) => (
  <footer className={[`footer`, className].filter(v => v).join(' ')}>
    <div className="container">
      Подвал
    </div>
  </footer>  
));