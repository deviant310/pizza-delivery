const React = require('react');

require('./style.css');

module.exports = React.memo(({className}) => (
  <footer className={[`footer mt-5`, className].filter(v => v).join(' ')}>
    <div className="container">
      © Pizza Delivery app for Innoscripta, 2020
    </div>
  </footer>  
));