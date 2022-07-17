/**
 * Commands that ping users.
 */

import {randomInt} from 'crypto';

import {Rank} from '../constants.js';

/** @typedef {import('./handle.js').Handler} Handler */

/**
 * See readme for chat commands.
 *
 * @type {!Map<string, Handler>}
 */
export const COMMANDS = new Map();

COMMANDS.set('admins', async (bot, username, msg) => {
  if (!(await bot.checkPermission(username, Rank.MOD, 'I'))) {
    bot.sendChatMsg(`${username} doesn't have permission to ping $admins FeelsWeirdMan`);
    return;
  }

  const pingableUsers = bot.userlist.filter((user) => user.name !== bot.username)
                            .filter((user) => user.rank > Rank.MOD)
                            .map((user) => user.name);
  const ping = pingableUsers.join(' ');

  bot.sendChatMsg(`DonkDink DinkDonk ${ping} Donk`);
});

COMMANDS.set('here', async (bot, username, msg) => {
  if (!await bot.db.moduleIsEnabled('here')) {
    bot.sendChatMsg('here module is disabled. To enable, use $module here on');
    return;
  }

  if (!(await bot.checkPermission(username, Rank.MOD, 'I'))) {
    if (!bot.hereGlobalLimiter.tryRemoveTokens(1)) {
      return bot.sendPm(username, '$here ping is on cooldown');
    }
  }

  const pingableUsers = bot.userlist.filter((user) => user.name !== bot.username)
                            .filter((user) => user.name !== 'JohnRG123')
                            .filter((user) => !user.meta.afk)
                            .map((user) => user.name);
  const ping = pingableUsers.join(' ');

  bot.sendChatMsg(`DonkDink DinkDonk ${ping} Donk`);
});

COMMANDS.set('everyone', async (bot, username, msg) => {
  if (!(await bot.checkPermission(username, Rank.MOD))) {
    bot.sendChatMsg(`${username} doesn't have permission to ping $everyone FeelsWeirdMan`);
    return;
  }

  const pingableUsers =
      bot.userlist.filter((user) => user.name !== bot.username).map((user) => user.name);
  const ping = pingableUsers.slice(0, 30).join(' ');
  const ping2 = pingableUsers.slice(30, 60).join(' ');
  const ping3 = pingableUsers.slice(60, 90).join(' ');
  const ping4 = pingableUsers.slice(90, 120).join(' ');
  const ping5 = pingableUsers.slice(120, 150).join(' ');
  const ping6 = pingableUsers.slice(150, 180).join(' ');
  const ping7 = pingableUsers.slice(180, 210).join(' ');
  const ping8 = pingableUsers.slice(210, 240).join(' ');
  const ping9 = pingableUsers.slice(240, 270).join(' ');
  const ping10 = pingableUsers.slice(270, 300).join(' ');
  if ((ping.length > 0) && (ping2.length === 0)) {
    bot.sendChatMsg(`DinkDonk ${ping} Donk DonkDink`);
  } else if (ping3.length === 0) {
    bot.sendChatMsg(`DinkDonk ${ping} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping2} Donk DonkDink`);
  } else if (ping4.length === 0) {
    bot.sendChatMsg(`DinkDonk ${ping} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping2} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping3} Donk DonkDink`);
  } else if (ping5.length === 0) {
    bot.sendChatMsg(`DinkDonk ${ping} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping2} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping3} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping4} Donk DonkDink`);
  } else if (ping6.length === 0) {
    bot.sendChatMsg(`DinkDonk ${ping} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping2} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping3} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping4} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping5} Donk DonkDink`);
  } else if (ping7.length === 0) {
    bot.sendChatMsg(`DinkDonk ${ping} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping2} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping3} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping4} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping5} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping6} Donk DonkDink`);
  } else if (ping8.length === 0) {
    bot.sendChatMsg(`DinkDonk ${ping} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping2} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping3} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping4} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping5} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping6} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping7} Donk DonkDink`);
  } else if (ping9.length === 0) {
    bot.sendChatMsg(`DinkDonk ${ping} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping2} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping3} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping4} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping5} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping6} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping7} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping8} Donk DonkDink`);
  } else if (ping10.length === 0) {
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping2} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping3} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping4} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping5} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping6} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping7} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping8} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping9} Donk DonkDink`);
  } else if (ping10.length > 0) {
    bot.sendChatMsg(`DinkDonk ${ping} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping2} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping3} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping4} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping5} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping6} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping7} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping8} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping9} Donk DonkDink`);
    await sleep(100);
    bot.sendChatMsg(`DinkDonk ${ping10} Donk DonkDink`);
  }
});

COMMANDS.set('mods', async (bot, username, msg) => {
  if (!await bot.db.moduleIsEnabled('mping')) {
    bot.sendChatMsg('mping module is disabled. To enable, use $module mping on');
    return;
  }

  if (!(await bot.checkPermission(username, Rank.MOD, 'I'))) {
    if (!bot.modscmdGlobalLimiter.tryRemoveTokens(1)) {
      return bot.sendPm(username, '$mods ping is on cooldown');
    }
  }

  const pingableUsers = bot.userlist.filter((user) => user.name !== bot.username)
                            .filter((user) => user.rank === Rank.MOD)
                            .map((user) => user.name);
  const ping = pingableUsers.join(' ');

  bot.sendChatMsg(`DonkDink DinkDonk ${ping} Donk`);
});

COMMANDS.set('ping', async (bot, username, msg) => {
  bot.sendChatMsg(`${username}: MrDestructoid Donk`);
});

COMMANDS.set('rngping', async (bot, username, msg) => {
  const randomIndex = randomInt(bot.userlist.length - 1);
  const randomUser = bot.userlist[randomIndex];
  bot.sendChatMsg(`${randomUser.name}: MrDestructoid Donk`);
});

COMMANDS.set('staff', async (bot, username, msg) => {
  if (!await bot.db.moduleIsEnabled('staff')) {
    bot.sendChatMsg('staff module is disabled. To enable, use $module staff on');
    return;
  }

  if (!(await bot.checkPermission(username, Rank.MOD, 'I'))) {
    bot.sendChatMsg(`${username} doesn't have permission to ping $staff FeelsWeirdMan`);
    return;
  }

  const pingableUsers = bot.userlist.filter((user) => user.name !== bot.username)
                            .filter((user) => user.rank >= Rank.MOD)
                            .map((user) => user.name);
  const ping = pingableUsers.join(' ');

  bot.sendChatMsg(`DonkDink DinkDonk ${ping} Donk`);
});
