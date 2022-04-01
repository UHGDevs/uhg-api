
const { Error } = require('../errors')
const EventEmitter = require('events');

class ApiKey extends EventEmitter {
  constructor(options) {
    super();

    if (typeof options !== 'object' || options === null) {
      throw new Error('INVALID_TYPE', 'options', 'object', true);
    }

    if (!options.key || typeof options.key !== 'string' || !(typeof options.key === 'array' && options.length)) {
      throw new Error('INVALID_TYPE', 'API key', 'string or an array');
    }

    this.key = null
    this.key_count = 0

    if (typeof options.key === 'string') {
      this.key = options.key
      this.key_count = 1
    } else {
      this.key_count = options.key.length
      options.key = options.key.filter(key => typeof key === 'string')

      if (option.key.length !== this.key_count) {
        throw new Error('API_KEY_COUNT', this.key_count, options.key.length);
      }
    }

    this.options = options

    this.test()

  }

  test() {

  }
}

module.exports = ApiKey;
