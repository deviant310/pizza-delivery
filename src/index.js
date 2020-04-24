const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router-dom');
const Redux = require('redux');
const ReactRedux = require('react-redux');

const Reducers = require.context('reducers', false, /\.js$/);

const store = Redux.createStore(Reducers('./cart.js'));

const App = require('./app.js');

let {BrowserRouter} = Router,
  {Provider} = ReactRedux;

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
