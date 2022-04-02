
const { Error } = require('../errors')
const EventEmitter = require('events');
const fetch = require('node-fetch');

class ApiKey extends EventEmitter {
  constructor(options) {
    super();

    this.key_uses = 0

    if (typeof options !== 'object' || options === null) throw new Error('INVALID_TYPE', 'options', 'object', true);
    if (options.key === undefined) throw new Error('API_KEY_MISSING');
    if (typeof options.key !== 'string' && !(typeof options.key === 'object' && Array.isArray(options.key) && options.key.length)) throw new Error('INVALID_TYPE', 'API key', 'string or an array');


    this.key = null
    this.key_count = 0

    this.use_key = 0

    if (typeof options.key === 'string') {
      this.key = [options.key]
      this.key_count = 1
    } else {
      this.key_count = options.key.length
      this.key = options.key.filter(key => typeof key === 'string')

      if (options.key.length !== this.key_count) throw new Error('API_KEY_COUNT', this.key_count, options.key.length);
    }

    this.test()
  }

  async test() {
    //const keys = this.key
    //this.key = []
    // for (let key of keys) {
    //   try {
    //     const response = await fetch(`http://api.hypixel.net/key?key=${key}`);
    //     const data = await response.json();
    //     if (!data.success) throw new Error('API_KEY_INVALIDE', `(${key})`);
    //   } catch (e) {console.info("Invalid authorization of API key (Hypixel API is having hard time)")}
    //   console.log(this.key)
    // }
  }

  getKey() {
    this.use_key += 1;
    this.key_uses += 1;
    if (this.use_key >= this.key_count) this.use_key = 0;
    console.log(this.key)
    return this.key[this.use_key];
  }

  ratelimit() {
    if (this.key_uses >= this.key_count * this.options.limit) return false;
    else return this.key_count * this.options.limit - this.key_uses;
  }
}

module.exports = ApiKey;
