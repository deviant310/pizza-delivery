const React = require('react');

const Lang = require('i18n/en.json');
const Catalog = require('components/catalog');

let banner = require('images/banners/main.jpg');

class Home extends React.PureComponent {
  componentDidMount() {
    let {mainTitle, homePageTitle} = Lang;
    document.title = [mainTitle, homePageTitle].join(' | ');
  }
  
  render(){
    return (
      <div className="home">
        <div className="mb-5">
          <div className="top-banner p-5" style={{backgroundImage: `url(${banner.default})`}}>
            <div className="mx-n5 row">
              <div className="top-banner__container px-5 col-9">
                <div className="top-banner__title my-3 h1 font-weight-light">Banner text! Look ma!</div>
                <div className="top-banner__subtitle mb-5 h4 font-weight-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </div>
            </div>
          </div>
        </div>
        <Catalog/>
      </div> 
    );
  }
}

module.exports = Home;