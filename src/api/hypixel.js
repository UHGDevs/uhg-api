
const { Error } = require('../errors')
const fetch = require('node-fetch');

class Hypixel {

  static async call(input) {
    return {success: true, type: "hypixel", stats: {ahoj: "AHOJ"}}
  }
}

module.exports = Hypixel;
