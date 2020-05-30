const Express = require('express');
const Path = require('path');
const Minimist = require('minimist')

const App = Express();

const env = Minimist(process.argv.slice(2));

if(env['use-dir']){
  App.use(Express.static(env['use-dir']));
  App.use('/', (request, response) => {
    response.sendFile(Path.resolve(env['use-dir'], 'index.html'));
  });

  App.listen(3000);
} else {
  throw new Error('--use-dir is not defined!')
}