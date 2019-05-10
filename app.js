'use strict';

const http = require('http');

const app = require('./src/config');

console.log(`Port : ${process.env.PORT || 3000}`);

const server = http.createServer(app);

server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => {
  console.log(
    `Server is running on: http://${server.address().address}:${process.env.PORT || 3000}`
  );
});
