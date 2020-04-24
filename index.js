const express = require('express');
const path = require('path');

const app = express();

const homeDir = 'dist';

app.use(express.static(homeDir));
app.use('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, homeDir, 'index.html'));
});

app.listen(3000);