const Express = require('express');
const Path = require('path');

const App = Express();

const UseDir = './dist';

App.use(Express.static(UseDir));
App.use('/', (request, response) => {
  response.sendFile(Path.resolve(UseDir, 'index.html'));
});

App.listen(8000);
