
const { Error } = require('../errors')
const EventEmitter = require('events');

class Api extends EventEmitter {
  constructor(options = {}) {
    super();

    if (typeof options !== 'object' || options === null) {
      throw new Error('INVALID_TYPE', 'options', 'object', true);
    }

    this.options = options
  }
}

module.exports = Api;
