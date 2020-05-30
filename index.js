const Express = require('express');
const Path = require('path');

const App = express();

const UseDir = process.env.USE_DIR;

if(UseDir){
  App.use(Express.static(UseDir));
  App.use('/', (request, response) => {
    response.sendFile(Path.resolve(UseDir, 'index.html'));
  });

  App.listen(8000);
} else {
  throw new Error('Set USE_DIR as custom environment variable!')
}