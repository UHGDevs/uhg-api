
class Options {

  static createDefault() {
    return {
      limit: 120,
      guildBot: false,
      currentTourney: null
    };
  }

  static createCall(client) {
    return {
      call: ['hypixel'],
      limit: client.options.limit,
      key_count: client.key_count,
      key: client.key.splice(0, client.key_count)
    }
  }
}

module.exports = Options;
