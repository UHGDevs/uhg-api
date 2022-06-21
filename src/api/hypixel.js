
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

    const api = { success: true, type: 'hypixel' };
    api._id = uuid
    api.uuid = uuid
    api.username = hypixel.displayname

    let rank = func.getRank(hypixel);
    
    api.rank = rank.rank;
    api.prefix = rank.prefix;
    api.color = func.getPlusColor(api.rank, hypixel.rankPlusColor).hex;

    api.level = func.getNwLevel(hypixel.networkExp || 0);
    api.karma = hypixel.karma || 0;
    api.aps = hypixel.achievementPoints || 0;

    api.nicks = hypixel.knownAliases || {};
    api.links = hypixel.socialMedia ? hypixel.socialMedia.links || {} : {};

    const achievements = hypixel.achievements || {};

    api.fishing = {
      fish: achievements.general_master_lure || 0,
      junk: achievements.general_trashiest_diver || 0,
      treasure: achievements.general_luckiest_of_the_sea || 0,
    }

    api.ranksGiven =  hypixel.giftingMeta ? hypixel.giftingMeta.ranksGiven || 0 : 0
    api.giftsGiven = hypixel.giftingMeta ? hypixel.giftingMeta.giftsGiven || 0 : 0
    api.quests = achievements.general_quest_master || 0
    api.challenges = achievements.general_challenger || 0
    api.lastLogin = hypixel.lastLogin || 0
    api.updated = Number(new Date())


    

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
