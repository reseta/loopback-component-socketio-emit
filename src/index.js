'use strict';

const _ = require('lodash');
const server = require('socket.io');
const serverAuth = require('socketio-auth');
const path = require('path');

class IO {
  constructor(app, options, server) {
    this.app = app;
    this.server = server;
    this.connections = [];
    this.setDefaultOptions(options);
  }

  setDefaultOptions(options) {
    _.defaultsDeep(options, { server: {
        transport: { transports: ['websocket'] },
      },
    });
    this.options = options;
  }

  connect() {
    const _this = this;
    this.server = server(this.server, this.options.server.transport);

    if (this.options.auth) {
      serverAuth(this.server, {
        authenticate: this.authenticate,
        AccessToken: this.app.models.AccessToken,
      });
    }

    this.server.on('connect', (socket) => {
      _this.connections.push(socket);
      socket.setMaxListeners(0);
      socket.on(_this.options.socketOn, function (input) {
        let regEx = new RegExp('^' + _this.options.startWith);
        if (regEx.test(input.event)) {
          let [eventAction, eventName] = input.event.split(':');
          if (eventName) {
            _this.app.emit(eventName, input.data);
          }
        }
      });

      socket.on('disconnect', () => socket.removeAllListeners());
    });

    return this.server;
  }

  authenticate(socket, value, callback) {
    this.AccessToken.find({
      where: {
        and: [{ userId: value.userId }, { id: value.id }],
      },
    }, function (err, token) {
      if (err) throw err;
      if (token.length) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  }
}

module.exports = IO;
