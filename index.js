'use strict';

const Logger = require('./src/logger');
const IO = require('./src/index');
const _ = require('lodash');

module.exports = (app, options) => {
  const logger = new Logger(options);
  try {
    if (!app || _.isUndefined(app)) {
      throw new Error('loopback-component-socketio-emit failed application instance missing');
    }

    app.on('started', (server) => {
      logger.log('loopback-component-socketio-emit starting');
      if (server && !_.isUndefined(server)) {
        const io = new IO(app, options, server);
        app.io = app.io || io.connect();
      } else {
        throw new Error('loopback-component-socketio-emit failed server instance missing');
      }

      logger.log('loopback-component-socketio-emit initialized');
    });
  } catch (e) {
    logger.log(e.message, 'error');
  }
};
