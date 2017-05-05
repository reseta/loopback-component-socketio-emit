'use strict';

const logger = require("winston-color");

class Logger {
  constructor(options) {
    this.logger = logger;
    this.debug = options.debug;
    this.type = 'info';
  }

  log(message, type) {
    if (type && typeof type !== 'undefined') {
      this.type = type;
    }

    if (this.debug) {
      this.logger[this.type](message);
    }
  }
}

module.exports = Logger
