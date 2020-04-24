const React = require('react');
const Router = require('react-router-dom');

const Header = require('components/header');
const Footer = require('components/footer');

const Pages = require.context('pages', false, /\.js$/);

require('bootstrap/dist/css/bootstrap.min.css');
require('@jfxteam/font-awesome/css/all.min.css');
require('./style.css');

let {Switch, Route, Redirect} = Router;

module.exports = () => (
  <div className="d-flex flex-column h-100">
    <Header className="flex-shrink-0"/>
    <main className="container flex-grow-1">
      <Switch>
        <Route exact path="/menu" component={Pages('./menu.js')}/>
        <Route exact path="/" component={Pages('./home.js')}/>
        <Redirect to='/'/>
      </Switch>
    </main>
    <Footer/>
  </div>
);
