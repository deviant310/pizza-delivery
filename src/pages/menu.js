const React = require('react');

const Lang = require('i18n/en.json');
const Catalog = require('components/catalog');

class Home extends React.PureComponent {
  componentDidMount() {
    let {mainTitle, menuPageTitle} = Lang;
    document.title = [mainTitle, menuPageTitle].join(' | ');
  }
  
  render(){
    return (
      <div className="section">
        <h1 className="mb-5">Menu</h1>
        <Catalog/>
      </div>
    );
  }
}

module.exports = Home;