
const { Error } = require('../errors')
const EventEmitter = require('events');
const Util = require('../util/Util');
const Options = require('../util/Options');
const fetch = require('node-fetch');

class ApiKey extends EventEmitter {
  constructor(options) {
    super();
    this.options = Util.mergeSettings(Options.createDefault(), options);

    if (typeof this.options !== 'object' || this.options === null) throw new Error('INVALID_TYPE', 'options', 'object', true);
    if (!this.options.key.length) throw new Error('API_KEY_MISSING');
    if (typeof this.options.key !== 'string' && !(typeof this.options.key === 'object' && Array.isArray(this.options.key) && this.options.key.length)) throw new Error('INVALID_TYPE', 'API key', 'string or an array');

    if (typeof this.options.key === 'string') {
      this.options.key = [this.options.key]
      this.options.key_count = 1
    } else {
      this.options.key_count = this.options.key.length
      this.options.key = this.options.key.filter(key => typeof key === 'string')

      if (this.options.key.length !== this.options.key_count) throw new Error('API_KEY_COUNT', this.options.key_count, this.options.key.length);
    }

    this.testKeys()
  }

  async testKeys() {
    const keys = this.options.key
    this.options.key = []
    for (let key of keys) {
      try {
        const response = await fetch(`http://api.hypixel.net/key?key=${key}`);
        const data = await response.json();
        if (!data.success) throw new Error('API_KEY_INVALIDE', `(${key})`);
        else this.options.key.push(key);
      } catch (e) {console.info("Invalid authorization of API key (Hypixel API is having hard time)")}
    }
    if (!this.options.key.length) throw new Error('API_KEY_NOT_WORKING');
    this.options.key_count = this.options.key.length
  }

  getKey() {
    this.options.use_key += 1;
    this.options.key_uses += 1;
    if (this.options.use_key >= this.options.key_count) this.options.use_key = 0;
    return this.options.key[this.options.use_key];
  }

  ratelimit() {
    if (this.key_uses >= this.key_count * this.options.limit) return false;
    else return this.key_count * this.options.limit - this.key_uses;
  }
}

module.exports = ApiKey;
