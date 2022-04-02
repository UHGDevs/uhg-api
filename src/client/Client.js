
const { Error } = require('../errors')
const ApiKey = require('./ApiKey');

class Client extends ApiKey {
  constructor(options = {}) {
    super(options);

    console.log(this.keys)

  }
}

module.exports = Client;
