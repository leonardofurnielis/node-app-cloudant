/* eslint-disable global-require */

'use strict';

const http = require('http');

const environment_loader = require('./boot/environment');
const log_loader = require('./boot/log');
const http_loader = require('./boot/http');
const initialization = require('./boot/initialization');
const security_loader = require('./boot/security');

module.exports = {
  listen: async (app) => {
    environment_loader();

    log_loader();

    http_loader(app);

    initialization();

    security_loader.passport();

    console.info(`Port: ${process.env.PORT || 3000}`);
    console.info(`NODE_ENV: ${process.env.NODE_ENV || 'local'}`);
    console.info(`Logger Level: ${process.env.LOGGER_LEVEL}`);

    const server = http.createServer(app);

    server.on('clientError', (err) => {
      console.error(err);
    });

    server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => {
      console.info(
        `Server is running on: http://${server.address().address}:${process.env.PORT || 3000}`
      );

      console.info(
        `OpenAPI-UI is running on: http://${server.address().address}:${
          process.env.PORT || 3000
        }/explorer`
      );
      console.info('To shut down, press <CTRL> + C at any time.');
    });
  },
};
