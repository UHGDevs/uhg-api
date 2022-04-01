
const { Error } = require('../errors')
const ApiKey = require('./ApiKey');

class Client extends ApiKey {
  constructor(options = {}) {
    super(options);

    

  }
}

module.exports = Client;
