
const fetch = require('node-fetch');
const func = require('../util/ApiFunctions');

class Hypixel {

  static async call(options) {
    const client = options.client;

    if (!options.uuid) return {success: false, type: "hypixel", reason: 'Hypixel API needs UUID to be called!'};

    const apikey = client.getKey();

    if (!apikey) return  {success: false, type: "hypixel", reason: `Hypixel API key not found`};
    const limit = client.ratelimit();
    const uuid = options.uuid;

    if (limit === false) return {success: false, type: "hypixel", reason: 'Hypixel API key limit reached!'};

    let hypixel;

    try { hypixel = await fetch(`https://api.hypixel.net/player?key=${apikey}&uuid=${uuid}`).then(api => api.json()) } catch (e) {return {success: false, type: "hypixel", reason: 'Hypixel API is getting touble!'}};
      console.log(apikey)
    if (!hypixel.success) return  {success: false, type: "hypixel", reason: `Hypixel API: ${hypixel.cause || 'error'}`};
    if (!hypixel.player.stats) return  {success: false, type: "hypixel", reason: `Hypixel API: Hráč nehrál žádnou minihru`};

    hypixel = hypixel.player;

    const api = require('./games/general')(hypixel, uuid)
    
    const achievements = hypixel.achievements || {};

    const blitz = hypixel.stats.HungerGames || {};
    const cac = hypixel.stats.MCGO || {};
    const duels = hypixel.stats.Duels || {};
    const murder = hypixel.stats.MurderMystery || {};
    const mw = hypixel.stats.Walls3 || {};
    const pb = hypixel.stats.Paintball || {};
    const pit = hypixel.stats.Pit || {};
    const quake = hypixel.stats.Quake || {};
    const skywars = hypixel.stats.SkyWars || {};
    const smash = hypixel.stats.SuperSmash || {};
    const speeduhc = hypixel.stats.SpeedUHC || {};
    const tkr = hypixel.stats.GingerBread || {};
    const tnt = hypixel.stats.TNTGames || {};
    const uhc = hypixel.stats.UHC || {};
    const vampirez = hypixel.stats.VampireZ || {};
    const walls = hypixel.stats.Walls || {};
    const warlords = hypixel.stats.Battleground || {};

    const ctourney = hypixel.tourney ? hypixel.tourney[client.options.currentTourney] || {} : {};


    api.stats = {};
    api.stats.arcade = require('./games/arcade')(hypixel.stats.Arcade)
    api.stats.arena = require('./games/arena')(hypixel.stats.Arena)
    api.stats.bb = require('./games/bb')(hypixel.stats.BuildBattle)
    api.stats.bedwars = require('./games/bedwars')(hypixel.stats.Bedwars)



    return api
  }
}

module.exports = Hypixel;
