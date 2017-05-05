
# LoopBack Component SocketIO Emit

A [LoopBack Framework](http://loopback.io) Component that provides firing loopback events over SocketIO.

# Installation

````sh
$ npm install --save loopback-component-socketio-emit
````

# Setup Back End Module

Update the  `server/component-config.json` as follows:

````json
{
  "loopback-component-socketio-emit": {
    "auth": true,
    "debug": false,
    "socketOn": "ME:RT:1://event",
    "startWith": "eventEmitter:"
  }
}

````

"startWith" ending with colon is required

# Client example

````javascript
IO.emit('eventEmitter:eventName', {});
````

# Backend example

````node
MyModel.on('attached', () => {
    MyModel.app.on('eventName', (data) => {
      MyModel.app.io.emit('event', {status: 'SUCCESS', data: data});
    });
  });
````
