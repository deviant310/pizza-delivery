const express = require('express');
const path = require('path');
const Minimist = require('minimist')

const app = express();

const env = Minimist(process.argv.slice(2));

if(env['use-dir']){
  app.use(express.static(env['use-dir']));
  app.use('/', (request, response) => {
    response.sendFile(path.resolve(env['use-dir'], 'index.html'));
  });

  app.listen(8000);
} else {
  throw new Error('--use-dir is not defined!')
}