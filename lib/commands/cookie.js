/**
 * Cookie commands.
 */

import {randomInt} from 'crypto';
import random from 'random';

import {COOKIE_CLAIM_COOLDOWN} from '../cookie.js';
import {plural} from '../utils.js';

/** @typedef {import('../cytubebot.js').CytubeBot} CytubeBot */
/** @typedef {import('./handle.js').Handler} Handler */

/**
 * See readme for chat commands.
 *
 * @type {!Map<string, Handler>}
 */
export const COMMANDS = new Map();

const MAX_COOKIES_PER_CLAIM = 5;
const geometric = random.geometric(0.6);
const COOKIE_TYPES = [
  'chocolate chip',
  'peanut butter',
  'oatmeal raisin',
  'shortbread',
  'gingerbread',
  'sugar',
  'snickerdoodle',
  'white chocolate macadamia nut',
  'ginger snap',
  'butter pecan',
];

COMMANDS.set('cookie', async (bot, username, msg) => {
  if (username === 'PeachyBot') {
    bot.sendChatMsg('/kick PeachyBot');
    return;
  }
  {
    const userCookie = await bot.cookies.getUserCookie(username);
    if (!userCookie.canClaimCookie()) {
      bot.sendChatMsg(
          `Can't claim yet, wait ${userCookie.nextCookieAt.toRelative().replace('in ', '')}...`);
      return;
    }
  }
  const toClaim = Math.min(Math.round(geometric()), MAX_COOKIES_PER_CLAIM);
  const userCookie = await bot.cookies.claimCookie(username, toClaim);
  const claimedType = COOKIE_TYPES[randomInt(COOKIE_TYPES.length)];

  bot.sendChatMsg(
      `${username} claimed ${toClaim} ${claimedType} cookie${plural(toClaim)}, ` +
      `now has ${userCookie.count} cookie${plural(userCookie.count)}! ` +
      `Cooldown: ${COOKIE_CLAIM_COOLDOWN.toHuman()}...`);
});

COMMANDS.set('cookies', async (bot, username, msg) => {
  const target = msg.split(' ')[0] !== '' ? msg.split(' ')[0] : username;
  if (target === '!poof' || target.startsWith('/')) {
    bot.sendChatMsg(`forsenCD Nice try.`);
    return;
  }
  let rank = 1;
  let cookies = -1;

  let pageNumber = 0;
  const pageSize = 100;
  pageLoop: while (true) {
    const page = await bot.db.getCookieLeaderboardPage(pageNumber, pageSize);
    for (const user of page) {
      if (user.name === target) {
        cookies = user.count;
        break pageLoop;
      }
      rank++;
    }

    if (page.length < pageSize) {
      bot.sendChatMsg(`Couldn't find ${target}'s rank`);
      return;
    }

    pageNumber++;
  }

  bot.sendChatMsg(`${target} has ${cookies} cookies (rank ${rank})`);
});

COMMANDS.set('cookieleaderboard', async (bot, username, msg) => {
  const pageSize = 5;
  const pageMsg = msg.split(' ')[0];
  const pageMsgParsed = pageMsg !== '' ? parseInt(pageMsg, 10) : 1;
  const pageNumber = !isNaN(pageMsgParsed) ? pageMsgParsed : 1;
  const firstRank = ((pageNumber - 1) * pageSize) + 1;
  if (pageNumber > 10000) {
    bot.sendChatMsg(`Nice try forsenCD`);
    return;
  }
  if (pageNumber < 0) {
    bot.sendChatMsg(`The page number needs to be a positive number Pepega Clap`);
    return;
  }

  const page = await bot.db.getCookieLeaderboardPage(pageNumber - 1, pageSize);
  const start = firstRank;
  const end = firstRank + page.length - 1;

  const pmIfUserCountGreaterThan = 50;

  const deliver = bot.userlist.length > pmIfUserCountGreaterThan ?
      (msg) => bot.sendPm(username, msg) :
      (msg) => bot.sendChatMsg(msg);

  if (bot.userlist.length > pmIfUserCountGreaterThan) {
    if (bot.leaderboardLargeChatLimiter.tryRemoveTokens(1)) {
      bot.sendChatMsg(`PMing leaderboard due to high # of users in chat`);
    }
  }

  deliver(`Cookie leaderboard ${start}-${end}:`);

  for (const [i, user] of page.entries()) {
    const rank = i + firstRank;
    deliver(`#${rank} ${user.count} cookies: ${user.name}`);
  }

  if (page.length === pageSize) {
    deliver(`For the next page, do $cookieleaderboard ${pageNumber + 1}`);
  }
});

COMMANDS.set('givecookie', async (bot, username, msg) => {
  if (!msg) {
    return;
  }
  const words = msg.split(' ');
  const gettingCookie = words[0];
  const amount = words[1];
  if (isNaN(amount) || amount < 1) {
    bot.sendChatMsg('Failed to parse cookie amount.');
    return;
  }
  const userCookies = await bot.db.getUserCookieCount(username);
  if (userCookies < amount) {
    bot.sendChatMsg('Nice try forsenCD');
    return;
  }
  const givingAliases = await bot.db.getUserAliases(username);
  const giveAliasTxt = givingAliases.aliases.toString().split(',');
  const gettingAliases = await bot.db.getUserAliases(gettingCookie);
  if ((gettingAliases) === null || (gettingAliases.aliases === null) ||
      (gettingAliases[0] === '') || (gettingAliases.aliases[0] === '') ||
      (gettingAliases.length === 0)) {
    bot.sendChatMsg('User not found or account too new to $givecookie');
    return;
  }
  const getAliasTxt = gettingAliases.aliases.toString().split(',');
  if ((getAliasTxt === null) || (giveAliasTxt === null)) {
    bot.sendChatMsg(`One or more accounts too new to $givecookie FeelsWeirdMan`);
    return;
  }
  // bot.sendChatMsg(`${giveAliasTxt.length} / ${getAliasTxt.length}`);
  for (let a = 0; a < giveAliasTxt.length; a++) {
    if (giveAliasTxt.includes(getAliasTxt[a])) {
      bot.sendChatMsg(`Nice try forsenCD`);
      bot.sendChatMsg(`/kick ${username}`);
      return;
    }
  }
  for (let a = 0; a < getAliasTxt.length; a++) {
    if (getAliasTxt.includes(giveAliasTxt[a])) {
      bot.sendChatMsg(`Nice try forsenCD`);
      bot.sendChatMsg(`/kick ${username}`);
      return;
    }
  }
  let amountNum = 0;
  amountNum = amount;
  const give = userCookies - amountNum;
  const get = +(await bot.db.getUserCookieCount(gettingCookie)) + +amountNum;
  await bot.db.giveUserCookie(username, give);
  await bot.db.giveUserCookie(gettingCookie, get);
  // bot.sendChatMsg(`give${give} get${get} db${await bot.db.getUserCookieCount(gettingCookie)}`);
  if (amount > 1) {
    bot.sendChatMsg(`${username} gave ${amount} cookies to ${gettingCookie}`);
  } else {
    bot.sendChatMsg(`${username} gave ${amount} cookie to ${gettingCookie}`);
  }
});
