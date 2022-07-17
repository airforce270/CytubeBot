/**
 * Various custom-type commands.
 */

// import {randomInt} from 'crypto';
import {randomInt} from 'crypto';
import humanizeDuration from 'humanize-duration';
import parseDuration from 'parse-duration';
import random from 'random';

import {Rank} from '../constants.js';
import {getCurrentUnixTimestamp, sleep} from '../utils.js';

/** @typedef {import('./handle.js').Handler} Handler */

export const /** @type {!Map<string, Handler>} */ COMMANDS = new Map();

const COCK_MAX_LENGTH = 14;

COMMANDS.set('cock', (bot, username, msg) => {
  const target = msg.split(' ')[0] !== '' ? msg.split(' ')[0] : username;
  const length = Math.round(Math.random() * COCK_MAX_LENGTH);
  if (target === '!poof') {
    bot.sendChatMsg('forsenCD Nice try.');
    return;
  }

  let /** @type {string} */ emote;
  if (length > 10) {
    emote = 'gachiHYPER';
  } else if (length < 4) {
    emote = 'forsenLaughingAtYou';
  } else {
    emote = 'gachiGASM';
  }

  bot.sendChatMsg(`${target}'s cock is ${length} inches long ${emote}`);
});

COMMANDS.set('gn', (bot, username, msg) => {
  bot.sendChatMsg(`FeelsOkayMan <3 gn ${username}`);
});

/** Function that generates a random number based on a normal distribution. */
const normal = random.normal(/** mu= */ 100, /** sigma= */ 15);

COMMANDS.set('iq', (bot, username, msg) => {
  const target = msg.split(' ')[0] !== '' ? msg.split(' ')[0] : username;
  const iq = Math.round(normal());
  if (target === '!poof') {
    bot.sendChatMsg('forsenCD Nice try.');
    return;
  }

  if (target === 'IP0G') {
    bot.sendChatMsg(`IP0G's IQ is 187 6Head WineTime ahh yes`);
    return;
  }

  let /** @type {string} */ emote;
  if (iq > 115) {
    emote = ', ah yes 6Head';
  } else if (iq < 85) {
    emote = 'Pepege';
  } else {
    emote = ', average ForsenLookingAtYou';
  }

  bot.sendChatMsg(`${target}'s IQ is ${iq} ${emote}`);
});

COMMANDS.set('pyramid', async (bot, username, msg) => {
  if (!msg) {
    return;
  }

  if (!bot.pyramidLimiter.tryRemoveTokens(1)) {
    return bot.sendPm(username, '$pyramid is on cooldown');
  }

  // Send an invisible character first so all of the pyramid lines are aligned (second and
  // subsequent message in a row are left-aligned in chat)
  bot.sendChatMsg('⠀');

  const word = msg.split(' ')[0];
  bot.sendChatMsg(`⠀ ${word}`);
  bot.sendChatMsg(`⠀ ${word} ${word}`);
  bot.sendChatMsg(`⠀ ${word} ${word} ${word}`);
  bot.sendChatMsg(`⠀ ${word} ${word} ${word} ${word}`);
  bot.sendChatMsg(`⠀ ${word} ${word} ${word}`);
  bot.sendChatMsg(`⠀ ${word} ${word}`);
  bot.sendChatMsg(`⠀ ${word}`);
});

COMMANDS.set('py', async (bot, username, msg) => {
  if (!msg) {
    return;
  }
  const words = msg.split(' ');
  const amount = words[0];
  const emote = words[1];
  if (amount > 17 || amount < 0) {
    bot.sendChatMsg(`[red]$py:[/] Amount too large or less than 0.`);
    return;
  }
  if (!(await bot.checkPermission(username, Rank.MOD))) {
    if (amount < 5) {
      const pricePer = 1000;
      const price = pricePer * amount;
      const currentPoints = await bot.db.getUserPoints(username);
      if (currentPoints < price) {
        bot.sendPm(username, `You don't have enough points for this command(${price})`);
        return;
      } else {
        await bot.db.updateUserPoints(username, -price);
      }
    } else if ((amount > 4) && (amount < 8)) {
      const pricePer = 1500;
      const price = pricePer * amount;
      const currentPoints = await bot.db.getUserPoints(username);
      if (currentPoints < price) {
        bot.sendPm(username, `You don't have enough points for this command(${price})`);
        return;
      } else {
        await bot.db.updateUserPoints(username, -price);
      }
    } else if ((amount > 7) && (amount < 11)) {
      const pricePer = 3000;
      const price = pricePer * amount;
      const currentPoints = await bot.db.getUserPoints(username);
      if (currentPoints < price) {
        bot.sendPm(username, `You don't have enough points for this command(${price})`);
        return;
      } else {
        await bot.db.updateUserPoints(username, -price);
      }
    } else if ((amount > 10) && (amount < 14)) {
      const pricePer = 5000;
      const price = pricePer * amount;
      const currentPoints = await bot.db.getUserPoints(username);
      if (currentPoints < price) {
        bot.sendPm(username, `You don't have enough points for this command(${price})`);
        return;
      } else {
        await bot.db.updateUserPoints(username, -price);
      }
    } else if (amount > 13) {
      const pricePer = 7000;
      const price = pricePer * amount;
      const currentPoints = await bot.db.getUserPoints(username);
      if (currentPoints < price) {
        bot.sendPm(username, `You don't have enough points for this command(${price})`);
        return;
      } else {
        await bot.db.updateUserPoints(username, -price);
      }
    }
  }
  const text = [];
  bot.sendChatMsg('⠀');
  for (let count = 0; count < (amount * 2); count++) {
    await sleep(75);
    if (count < amount) {
      text.push(emote);
      bot.sendChatMsg(`⠀ ${text.join(' ')}`);
    } else {
      text.pop();
      bot.sendChatMsg(`⠀ ${text.join(' ')}`);
    }
  }
});

COMMANDS.set('tuck', (bot, username, msg) => {
  const target = msg.split(' ')[0];
  if (target === '') {
    bot.sendChatMsg(
        `${username}, who do you want to tuck in? FeelsOkayMan ` +
        'Example: $tuck MrDestructoidCyDJ');
  }

  bot.sendChatMsg(`Bedge ${username} tucks ${target} into bed.`);
});

COMMANDS.set('mc', (bot, username, msg) => {
  bot.sendChatMsg(
      `${username}, We have a community Minecraft Anarchy Server thats open` +
      ` to everyone. Info on the server and joining here: https://discord.gg/bZtYVSC8gY`);
});

COMMANDS.set('mcinfo', async (bot, username, msg) => {
  if (!(await bot.checkPermission(username, Rank.ADMIN))) {
    bot.sendChatMsg(`${username} does not have permission to enable mcinfo. FeelsWeirdMan`);
    return;
  }
  const words = msg.split(' ');
  let amount = words[1];
  const waitTime = parseDuration(words.slice(0).join(' '), /** format= */ 'sec');
  if (isNaN(waitTime) || waitTime < 0) {
    bot.sendChatMsg('Failed to parse interval time. Example $mcinfo 1h 24');
    return;
  }
  if (isNaN(amount) || amount < 0) {
    bot.sendChatMsg('Failed to parse amount. Example $mcinfo 30m 12');
    return;
  }
  const waitTimeMs = waitTime * 1000;
  const interval = humanizeDuration(waitTime * 1000);
  bot.sendChatMsg(`/me Now sending mcinfo ${amount} times, every ${interval}`);

  while (amount != 0) {
    bot.sendChatMsg(
        `We have a community Minecraft Anarchy Server thats open` +
        ` to everyone. Info on the server and joining here: https://discord.gg/bZtYVSC8gY`);
    await sleep(waitTimeMs);
    amount--;
  }
});

const H_TIER_SHIP = [
  'CatAHomie they go together like salt and pepper.',
  'klaiusGuraHug they should get married.',
  'dankHug a perfect match.',
  'elisLove a match made in heaven',
  'OnionFlushed',
];

const MH_TIER_SHIP = [
  'monkaHmm not a bad match.',
  'They have a decent chance, just bUrself',
  'OkayMan they make an okay match man.',
  'veiHugging they make a good match most of the time.',
  'muniSip what are you waiting for?',
];

const ML_TIER_SHIP = [
  'pepegaGamble its a bit of a gamble.',
  'They may not be the best together, but the drama would be fun to watch JuiceTime',
  'VeryPog',
  'DocLookingAtYourWife',
  'klaiusGuraLost that may be a lost cause.',
];

const L_TIER_SHIP = [
  'CaitlynS run.',
  'They go together like cereal and orange juice DansGame',
  'monkaS I\'ve seen into your future together, it doesn\'t look good..',
  'Awkward ...',
  'FeelsBadMan not a match.',
  'ElNoSabe el no sabe',
];

COMMANDS.set('ship', async (bot, username, msg) => {
  const words = msg.split(' ');
  const first = words[0];
  const second = words[1];
  if (first === '!poof') {
    bot.sendChatMsg('forsenCD Nice try.');
    return;
  }

  if (first === '') {
    bot.sendChatMsg('Invalid syntax. Examples: $ship iP0G spintto / $ship iP0G');
    return;
  }

  const sPercent = Math.floor(Math.random() * 101);
  const sPhrase = (() => {
    if (sPercent <= 25) {
      return L_TIER_SHIP[Math.floor(Math.random() * L_TIER_SHIP.length)];
    } else if ((sPercent > 25) && (sPercent <= 50)) {
      return ML_TIER_SHIP[Math.floor(Math.random() * ML_TIER_SHIP.length)];
    } else if ((sPercent > 50) && (sPercent <= 75)) {
      return MH_TIER_SHIP[Math.floor(Math.random() * MH_TIER_SHIP.length)];
    } else if (sPercent > 75) {
      return H_TIER_SHIP[Math.floor(Math.random() * H_TIER_SHIP.length)];
    }
  })();

  if (second != null) {
    bot.sendChatMsg(`${first} and ${second} have a ${sPercent}% compatibility. ${sPhrase}`);
  } else {
    bot.sendChatMsg(`${username} and ${first} have a ${sPercent}% compatibility. ${sPhrase}`);
  }
});

// const timersRead = CytubeBot.readTimerPhrases();
// const tEndsRead = await bot.readTimerEnds();
// const tStartsRead = await bot.readTimerStarts();
let timers = [];       // assoc file timers.txt
let timerEnds = [];    // assoc file tEnd.txt
let timerStarts = [];  // assoc file tStarts.txt
// timers = timers.concat(timersRead);
// timerEnds = timerEnds.concat(tEndsRead);
// timerStarts = timerStarts.concat(tStartsRead);

COMMANDS.set('timer', async (bot, username, msg) => {
  const words = msg.split(' ');
  const waitTime = parseDuration(words[0], /** format= */ 'sec');
  if (isNaN(waitTime) || waitTime <= 0) {
    bot.sendChatMsg('Failed to parse time. Example: $timer 10m this is my timer message');
    return;
  }
  for (let w = 0; w < words.length; w++) {
    if (words[w].endsWith('do')) {
      for (let w = 0; w < words.length; w++) {
        if (words[w].startsWith('poof')) {
          bot.sendChatMsg(`Nice try forsenCD`);
          return;
        }
      }
    }
  }
  const message = words.slice(1).join(' ');
  if ((!message) || message === '') {
    bot.sendChatMsg(`${username}, you must have a phrase for your timer FeelsLateMan`);
    return;
  }
  const waitTimeMs = waitTime * 1000;
  const interval = humanizeDuration(waitTime * 1000);
  bot.sendChatMsg(`/me [blue]${username}[/] set a timer for ${interval}`);
  const end = getCurrentUnixTimestamp() + waitTime;
  timers.push(message);
  timerEnds.push(end);
  const tStart = getCurrentUnixTimestamp();
  timerStarts.push(tStart);

  bot.writeTimerPhrases(timers);
  bot.writeTimerEnds(timerEnds);
  bot.writeTimerStarts(timerStarts);

  await sleep(waitTimeMs);
  bot.sendChatMsg(`[red][TIMER: ${interval}][/]: ${message}`);
  const indexTmsg = timers.indexOf(message);
  timers.splice(indexTmsg, 1);
  const indexTend = timerEnds.indexOf(end);
  timerEnds.splice(indexTend, 1);
  const indexTstart = timerStarts.indexOf(tStart);
  timerStarts.splice(indexTstart, 1);
  bot.writeTimerPhrases(timers);
  bot.writeTimerEnds(timerEnds);
  bot.writeTimerStarts(timerStarts);
});

let timeWithMsg = [];
let timeLeft = [];
let firstAfterRestart = true;

function setFirstAfterR() {
  firstAfterRestart = false;
  return firstAfterRestart;
}
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

COMMANDS.set('timers', async (bot, username, msg) => {
  if (firstAfterRestart === true) {
    const timersRead = await bot.readTimerPhrases();
    const timerEndsRead = await bot.readTimerEnds();
    const timerStartsRead = await bot.readTimerStarts();
    const tRead = timersRead;
    if ((tRead.length === 0) && (timers.length === 0)) {
      bot.sendChatMsg(`There are currently no active timers.`);
      setFirstAfterR();
      return;
    } else if (tRead.length === 0) {
      setFirstAfterR();
    } else {
      timers = timers.concat(timersRead);
      timerEnds = timerEnds.concat(timerEndsRead);
      timerStarts = timerStarts.concat(timerStartsRead);
      timers = removeDuplicates(timers);
      timerEnds = removeDuplicates(timerEnds);
      timerStarts = removeDuplicates(timerStarts);
      setFirstAfterR();
    }
  }
  timeLeft = [];
  timeWithMsg = [];

  if (timers.length === 0) {
    bot.sendChatMsg(`There are currently no active timers.`);
    return;
  }
  for (let h = 0; h < timerEnds.length; h++) {
    const timerEnd = timerEnds[h] - getCurrentUnixTimestamp();
    const tmrEnd = humanizeDuration(timerEnd * 1000);
    timeLeft.push(tmrEnd);
  }
  for (let i = 0; i < timers.length; i++) {
    const percentDone =
        ((timerEnds[i] - getCurrentUnixTimestamp()) / (timerEnds[i] - timerStarts[i])) * 100;
    if (percentDone > 66) {
      timeWithMsg.push(`${i + 1}. ${timers[i]} [bw][green]${timeLeft[i]} left.[/][/]`);
    } else if ((percentDone <= 66) && percentDone > 33) {
      timeWithMsg.push(`${i + 1}. ${timers[i]} [bw][yellow]${timeLeft[i]} left.[/][/]`);
    } else {
      timeWithMsg.push(`${i + 1}. ${timers[i]} [bw][red]${timeLeft[i]} left.[/][/]`);
    }
  }
  bot.sendChatMsg(`Active timers:`);
  for (let m = 0; m < timeWithMsg.length; m++) {
    bot.sendChatMsg(`${timeWithMsg[m]}`);
  }
});

let isJamming = false;

COMMANDS.set('jam', async (bot, username, msg) => {
  if (!(await bot.checkPermission(username, Rank.MOD))) {
    bot.sendChatMsg(`${username} does not have permission to use $jam. FeelsWeirdMan`);
    return;
  }
  const words = msg.split(' ');
  const waitTime = parseDuration(words[0], /** format= */ 'sec');
  const emotes = [
    'guraDance',
    'pepeJAM',
    'forsenPls',
    'ferretJAM ',
    'FishJam ',
    'RainbowPls ',
    'xqcTechno ',
    'vibePls ',
    'VibePls ',
    'VIBE ',
    'Citto ',
    'CatDance ',
    'nyanPls ',
    'elisDance ',
    'Dance2x ',
    'docPls ',
  ];
  const waitTimeMs = waitTime * 1000;
  if (waitTimeMs < 1000) {
    bot.sendChatMsg(`Duration between messages is too short WeirdMan`);
    return;
  }
  if (isNaN(waitTimeMs) || waitTimeMs <= 0) {
    bot.sendChatMsg('Failed to parse time.');
    return;
  }
  if (!msg) {
    bot.sendChatMsg('Please set a time between messages. Ex. [b]$jam 2s');
  }
  bot.sendPm(username, 'Do [b]$stopjam[/] to stop bot from jamming.');
  isJamming = true;
  while (isJamming === true) {
    await sleep(waitTimeMs);
    const emote = emotes[randomInt(emotes.length)];
    bot.sendChatMsg(`${emote}`);
  }
});

COMMANDS.set('stopjam', async (bot, username, msg) => {
  if (!(await bot.checkPermission(username, Rank.MOD))) {
    bot.sendChatMsg(`${username} does not have permission to $stopjam. FeelsWeirdMan`);
    return;
  }
  isJamming = false;
});

COMMANDS.set('css', async (bot, username, msg) => {
  if (username != 'IP0G') {
    bot.sendChatMsg('You can not use this command WeirdMan');
    return;
  }

  const css = `/* ----- Smoothing default CyTube CSS (works without JS) ----- */\n\n\t/* -- ` +
      `body -- */\n\n@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=sw` +
      `ap');\n@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');\n\n` +
      `body {\n    font-family: 'Varela Round', sans-serif;\n    font-size:14px;\n    font-` +
      `weight:` +
      `lighter;\n}\n\nb, strong {\n    font-weight: 400;\n}\n\nh2, h5, h6, h5 {\n    font-family:` +
      ` 'Varela Round', sans-serif;\n}\n\nh1, h4, h3 {\n    font-family: 'Quicksand', sans-serif` +
      `;\n}\n\n.poll-notify {\n    font-weight:normal;\n}\n\n.userlist_owner{\n    font-weight:l` +
      `ighter!important;\n}\n\n.label {\n    font-weight:lighter\n}\n\nlabel {\n    font-w` +
      `eight:li` +
      `ghter\n}\n\n\t/* -- buttons -- */\n\n.btn {text-shadow:none}\n\n\t/* -- modal windows --` +
      ` */\n\n@media screen and (min-width: 768px) {\n\t.modal-dialog {max-width:950px !importan` +
      `t; margin-top:10px}\n}\n\n\t/* -- brand -- */\n\n.navbar-brand {cursor:default}\n\n.navba` +
      `r-brand, .navbar-inverse {\n    /*original #ccc */\n    color: white!important;\n    tex` +
      `t-shadow: 0px 0px 10px black, 0px 0px 10px black !important;\n}\n\ninput#logout[type=\"s` +
      `ubmit\"] {\n    color: #fff;\n    background: none;\n    border: none;\n    padding: 0; ` +
      `\n}\n\n\t/* -- MOTD -- */\n\n#motdwrap {padding:10px; border-color:white; box-shadow:none` +
      `}\n#togglemotd {margin-top:-5px}\n\n\t/* -- superadmin icon -- */\n\n.glyphicon-globe {m` +
      `argin-right:3px}\n\n\t/* -- playlist row panes -- */\n\n#rightpane, #leftpane {margin-to` +
      `p:5px !important; margin-bottom:5px !important}\n\n\t/* -- left pane wells -- */\n\n#lef` +
      `tpane .well {margin-bottom:5px}\n\n\t/* -- queue titles -- */\n\n.qe_title {\n    font-` +
      `family: 'Quicksand', sans-serif;\n    margin-left:4px;\n    letter-spacing:.6px;\n}\n\n` +
      `\t/* -- footer -- */\n\n#footer {padding-bottom:5px; height:auto}\n\n\n/* ----- Patching` +
      ` CSS after loading JS (comments only here, actual patches in the JS) ----- */\n\n\n/* --` +
      `--- CyTube Plus created elements CSS ----- */\n\n\n\t/* -- channel avatar -- */\n\n#chan` +
      `avatar {margin-right:10px}\n\n\t/* -- azuki row (user top logo) -- */\n\n#azukirow {\n\t` +
      `padding-left:5px; padding-right:5px; border-left:solid 2px transparent; border-right:sol` +
      `id 2px transparent;\n\tbackground:transparent; background-repeat:no-repeat !important` +
      `; background-position:center center !important;\n\tmargin:0px -8px; min-height:` +
      `5px;\n}\n\n\t/* -- MOTD elements -- */\n\n#motdlogo {\n    max-width: 100%;\n` +
      `    max-height: 100%;\n    float: left;\n    border: solid;\n    border-radius: 15px;\n  ` +
      `  /* border-style: dashed; */\n    border-color: #94d1bd;\n}\n\n#motdtabswrap {margin-to` +
      `p:8px}\n.motdtabs-btn {margin-right:5px}\n#motdtabscontent {padding:10px 5px}\n\n\t/* --` +
      ` ru` +
      `les button and panel -- */\n\n#rulesbtnwrap {text-align:center}\n#rules-btn {margin-t` +
      `op:10p` +
      `x; margin-bottom:5px}\n#rulespanel-outer {width:100%; padding:0px}\n#rulespanel {\n\tmax` +
      `-width:700px; margin:0 auto; margin-top:0px; padding:4px; border:solid 2px white; text-a` +
      `lign:left;\n\tborder-radius:8px; -moz-border-radius:8px; -webkit-border-radius:8px; flo` +
      `at:left;\n}\n\n\t/* -- attention bar -- */\n\n#attbarrow-outer {padding:0px 5px}\n#attba` +
      `r {height:22px; background-color:white}\n\n\t/* -- full-sized title row -- */\n\n#titlero` +
      `w {\n\tbackground-color:#ffffff00!important;\n\tbackground-image:linear-gradient(to righ` +
      `t, #cccccc, #cccccc);\n\tbackground-position:0px center;\n\tbackground-size:0% 100%; bac` +
      `kground-repeat:no-repeat;\n\tmargin:-5px -8px 5px;\n\tborder-radius:4px;\n}\n\n#titlerow` +
      `-outer {\n    padding: 3px 5px;\n    text-align: center;\n    font-size: 16pt;\n    colo` +
      `r: #fff !important;\n    color: #ffff91!important;\n    /* text-shadow: 0px 0px 10px #8b` +
      `8b8b, 0px 0px 10px #ffff91 !important; */\n    background-color: #293d36;\n    letter-sp` +
      `acing: 2px;\n    border-radius: 10px;\n    border: 1px solid;\n}\n\n#titlerow #currentti` +
      `tle {\n    font-family: 'Quicksand', sans-serif;\n    border:none; \n    background:tran` +
      `sparent;\n    /*background-image:url(https://cdn.betterttv.net/emote/55edf68356405635537` +
      `bea72/2x)!important;*/\n}\n\n#currenttitle{\n    max-width:calc(100% - 0px);\n    displa` +
      `y:block;\n    white-space:nowrap;\n    overflow:hidden;\n    text-overflow:ellipsis;\n  ` +
      `  line-height:45px;\n    background-color: #272b30;\n}\n\t/* -- media info bar -- */\n\n` +
      `#mediainfo {\n\tbackground:transparent; margin-bottom:0px; border-width: 1px 1px 0px; bo` +
      `rder-style:solid solid none;\n\tborder-color:#CCC #CCC -moz-use-text-color; border-radiu` +
      `s:5px 5px 0px 0px; height:21px;\n}\n\n\t/* -- player alert (if hidden video after loadin` +
      `g) -- */\n\n#ytapiplayer .alert {text-align:left; margin:0px -15px}\n\n\t/* -- player co` +
      `vering layer -- */\n\n#coverpl {\n\tposition:absolute; left:5px; top:0px; background-col` +
      `or:white;\n\tbackground-repeat:no-repeat; background-position:center center;\n        ma` +
      `x-width:100%!important; max-height:100%!important;\n}\n\n\t/* -- sounds and admin panels` +
      ` GUI layers -- */\n\n#sounds-dropdown, #chatfunc-dropdown {\n\tposition:absolute; top:22` +
      `px; display:block; z-index:10000; padding:5px;\n\toverflow:auto; margin-right:5px;\n}\n#` +
      `muteall-btn, #spamclear-btn, #antiafk-btn {width:100%}\n\n\t/* -- chat controls buttons ` +
      `group -- */\n\n#chatcontrols {margin-top:4px}\n\n\t/* -- chat elements -- */\n\n.squavat` +
      `ar {width:24px; height:24px; margin-right:3px; border:solid 6px; vertical-align:middle; ` +
      `display:inline-block}\n.avatar {margin-right:3px}\n.server-whisper + .squavatar {display` +
      `:none}\n.globalmod {margin-right:2px}\n.embedimg {max-width:200px; max-height:300px}\n.e` +
      `mbedvid {max-width:200px; max-height:300px; border:0px; vertical-align:middle}\n\n` +
      `\t/* -- main fonts and emotes GUI layer -- */\n\n#chatpanel {\n    margin-top:0px; \n   ` +
      ` margin-bottom:0px;\n}\n\n#fontspanel, #emotespanel {\n\ttext-align:center; max-width:70` +
      `0px; margin:0px auto 5px auto; border:solid 2px white; border-radius:6px\n}\n\n.fluidpan` +
      `el {max-width:1200px !important}\n\n\t/* -- fonts panel -- */\n\n#fontsbtnwrap {margin-t` +
      `op:5px; margin-bottom:5px}\n#unibtnwrap {margin:5px 45px 2px}\n@media (max-width:767px) ` +
      `{\n\t#unibtnwrap {margin:5px 25px 2px}\n}\n#fontsbtnwrap .btn, #unibtnwrap .btn {margin:` +
      `0px 3px 3px 3px}\n\n\t/* -- emotes panel -- */\n\n#emotespanel img {margin:5px; max-heig` +
      `ht:35px; cursor:pointer}\n#emotesbtnwrap {text-align:center; margin:5px}\n#emotespanel .` +
      `alert {text-align:left; margin:5px -10px}\n\n\t/* -- advanced playlist controls -- */` +
      `\n\n#advplcontrols {width:100%; padding-top:10px}\n#advplcontrols button {width:25%}\n\n` +
      `\t/* -- database and galleries buttons gruoup -- */\n\n#leftpanecontrols {margin-right:5` +
      `px}\n\n\t/* -- layout configuration box toggling button -- */\n\n#layout-btn {margin-lef` +
      `t:5px}\n\n\t/* -- various configuration box elements -- */\n\n#configbtnwrap, #modewrap,` +
      ` #themewrap, #funcbtnwrap, #cleardbwrap, #gallery-well, #hidewrap, #embedwrap {\n\ttext-` +
      `align:center;\n}\n.conf-cap {padding-top:9px}\n#mode-sel, #theme-sel, #gal-sel {width:80` +
      `%; margin:0px auto}\n.theme-header {text-align:center; font-size:9pt; font-style:italic}` +
      `\n#embed-help {cursor:pointer; margin-left:7px}\n\n\t/* -- channel database -- */\n\n.db` +
      `-cat {overflow:auto; max-height:400px}\n.db-break {width:100%}\n.db-title {margin-left:4` +
      `px}\n.db-link {margin-left:5px}\n#previewFrame {margin:0 auto; display:block}\n\n` +
      `\t/* -- channel galleries -- */\n\n#galleryFrame {margin-bottom:10px}\n#gal-sel {margin-` +
      `bottom:20px}\n\n\t/* -- custom footer -- */\n\n#leftfooter {font-size:10pt}\ndiv[id=\"le` +
      `ftfooter\"] {text-align:center; margin-bottom:5px}\n#rightfooter {float:right; margin:0p` +
      `x 0px 15px 15px}\n\n\n/* ----- Additional JS classes ----- */\n\n\n.relative {position:r` +
      `elative}\n\n.covered {visibility:hidden; opacity:0}\n\n.dist {background-color:gold; col` +
      `or:red; font-size:12pt; font-family:times new roman; padding:3px}\n\n.mX {\n\t-webkit-tr` +
      `ansform:scaleX(-1); -moz-transform:scaleX(-1); transform:scaleX(-1);\n\t-ms-transform:sc` +
      `aleX(-1); -o-transform:scaleX(-1);\n}\n\n.mY {\n\t-webkit-transform:scaleY(-1); -moz-tra` +
      `nsform:scaleY(-1); transform:scaleY(-1);\n\t-ms-transform:scaleY(-1); -o-transform:scale` +
      `Y(-1);\n}\n\n.rotate {\n\t-webkit-transform:rotate(180deg); -moz-transform:rotate(180deg` +
      `); transform:rotate(180deg);\n\t-ms-transform:rotate(180deg); -o-transform:rotate(180deg` +
      `);\n}\n\n.vertical {\n\t-webkit-transform:rotate(270deg); -moz-transform:rotate(270deg);` +
      ` transform:rotate(270deg);\n\t-ms-transform:rotate(270deg); -o-transform:rotate(270deg);` +
      `\n}\n\n#messagebuffer div {\n    border-top: rgba(64,64,64,0.30) 1px solid;\n    border-` +
      `bottom: rgba(0,0,0,0.5) 1px solid;\n    border-right: 1px solid rgba(0,0,0,0.65);\n    m` +
      `argin-top: 1px;\n    padding: 5px;\n    margin-left: -5px;\n    margin-right: -5px;\n   ` +
      ` /*transition: opacity ease-in-out .7s;*/\n}\n\n.nick-highlight {\n    background-color:` +
      ` rgb(148 209 189 / 40%)!important;\n    color: #ffd966;\n    text-shadow:0px 0px 10px rg` +
      `b(255 217 102)!important;  /*, 0px 0px 10px #ffd966 !important*/\n}\n\n.navbar-brand {\n` +
      `    float: left;\n    padding: 10px;\n    font-size: 18px;\n    line-height: 32px;\n    ` +
      `height: 50px;\n}\n\n.dropdown-menu {\n    animation: animateDropdown 300ms ease-in-out f` +
      `orwards;\n    transform-origin: top center;\n}\n\n@keyframes animateDropdown {\n    0% {` +
      `\n        transform: rotateX(-90deg)\n    }\n    70% {\n        transform: rotateX(20deg` +
      `) \n    }\n    100% {\n        transform: rotateX(0deg) \n    }\n}\n\n#chanavatar {\n   ` +
      ` float: left;\n    padding: 0px;\n}\n\n#resize-video-smaller {\ndisplay: none;\n}\n\n#re` +
      `size-video-larger {\ndisplay: none;\n}\n\n.shout {\n    color: #ff0000;\n    font-weight` +
      `: lighter!important;\n    font-size: 18pt!important;\n}\n\n#audiofeedbacktoggle {\ndispl` +
      `ay:none;\n}\n\n#compacttoggle {\ndisplay:none;\n}\n\n#titletoggle {\ndisplay:none;\n}\n` +
      `\n#timestamptoggle {\ndisplay:none;\n}\n\n/*#emotelistbtn {\n    margin-left: -5px;\n}*/` +
      `\n\n.panel-primary>.panel-heading {\n    background-color: #94d1bd;\n    border: 2px so` +
      `lid #94d1bd!important;\n    border-radius: 10px!important;\n    color: #fff;\n  backgrou` +
      `nd-image: url(https://cdn.discordapp.com/attachments/915490680468561990/9476083022027899` +
      `58/trig.gif)!important;\n    background-size: contain!important;\n    background: scroll` +
      `;\n    text-shadow: 0px 0px 10px #000000, 0px 0px 10px #000 !important;\n}\n\n.pm-panel ` +
      `> .panel-body > .pm-buffer {\n    background-color: #141f1b;\n}\n\n.panel-default>.panel` +
      `-heading {\n    background-color: #293d36bd;\n    color:#94d1bd;\n    border-radius:10px` +
      `!important\n}\n\n.pm-panel {\n    border-radius:10px!important\n}\n\n.profile-box{\n    ` +
      `-left:-10vw;\n    width:auto; \n}\n\n.server-msg-disconnect {\n    font-family: 'Quicksa` +
      `nd', sans-serif;\n    border: 2px solid #94d1bd!important;\n    background-image: url(ht` +
      `tps://cdn.discordapp.com/attachments/915490680468561990/947608302202789958/trig.gif)!imp` +
      `ortant;\n    background-size: contain!important;\n    background: scroll;\n    color: #f` +
      `ff;\n    border-radius: 15px;\n    font-size: 18px;\n    font-style: italic;\n    text-a` +
      `lign: justify;\n    text-shadow: 10px 0px 10px #000000, 10px 0px 10px #000000 !important` +
      `;\n    transition: all .7s!important;\n}\n\n.server-msg-disconnect:hover {\n    transfor` +
      `m: scale(1.03);\n    transition: all .4s!important;\n}\n\n.server-msg-reconnect {\n    f` +
      `ont-family: 'Quicksand', sans-serif;\n    border: 2px solid #94d1bd!important;\n    back` +
      `ground-image: url(https://cdn.discordapp.com/attachments/915490680468561990/947608302202` +
      `789958/trig.gif)!important;\n    background-size: contain!important;\n    background: sc` +
      `roll;\n    color: #fff;\n    border-radius: 15px;\n    font-size: 18px;\n    font-style:` +
      ` italic;\n    text-align: justify;\n    text-shadow: 10px 0px 10px #000000, 10px 0px 10p` +
      `x #000000 !important;\n    transition: all .7s!important;\n}\n\n.server-msg-reconnect:ho` +
      `ver {\n    transform: scale(1.03);\n    transition: all .5s!important;\n}\n\n#cs-chanlog` +
      `-filter{height:150px!important;margin-bottom:10px!important}\n#cs-chanlog-text{backgroun` +
      `d-color:#141414!important;color:red;border:0 solid}\n\n.form-control{color:#c8c8c8;width` +
      `:100%;border-top:0;background-color:#141414;border:solid 1px #ccc}\n\n#messagebuffer{\n ` +
      ` transition: all 0.5s !important;\n}\n\n#messagebuffer div.nick-hover{\n    border-left:` +
      ` #FF0000 solid 1px;\n    padding-left: 4px;\n/*    transition: 0.3s;*/\n}\n\n.form-group` +
      `{\n  transition: all 0.5s !important;\n}\n\n.navbar-inverse .navbar-nav>li>a, .navbar-in` +
      `verse .navbar-text {\n  font-family: 'Quicksand', sans-serif;\n  transition: all 0.5s;\n` +
      `  color:#ccc!important\n}\n\n.nav-tabs>li>a {\n  transition: all 0.3s;\n}\n\n.nav-tabs>l` +
      `i.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {\n  background-col` +
      `or:#5c7069;\n  border-width:3px;\n}\n\n.dropdown-menu>li>a {\n    transition: all 0.3s;` +
      `\n    color: #ccc!important;\n}\n\n.row{\n  transition: all 0.5s;\n}\n\n.btn, .btn-defau` +
      `lt, .btn-group .btn+.btn, .btn-group .btn+.btn-group, .btn-group .btn-group+.btn, .btn-g` +
      `roup .btn-group+.btn-group {\n  transition: all 0.3s;\n  border-radius:10px;\n}\n\n.btn ` +
      `{\n  box-shadow: inset 0 0 0 0 #4cb290;\n  -webkit-transition: ease-out 0.4s;\n  -moz-tr` +
      `ansition: ease-out 0.4s;\n  transition: ease-out 0.4s;\n}\n\n.well {\n    background-col` +
      `or: #ff66ab33;\n    border-radius: 10px;\n    border-color: #ff66ab!important;\n    bord` +
      `er: 1px solid;\n}\n\n.alert-danger {\n    background-color: #ee5f5b33;\n    border-radiu` +
      `s: 10px;\n    border-color: #ed4d63!important;\n    border: 1px solid;\n}\n\n#motdwrap ` +
      `{\n    border-color:white!important;\n}\n\n#motd {\n    font-family: 'Quicksand', sans-s` +
      `erif;\n    text-align: center;\n    font-size: 16px;\n}\n\n.alert-info {\n    background` +
      `-color: #ff66ab33;\n    border-color: #ff66ab;\n    color: #fff;\n    border-radius: 10p` +
      `x;\n    border-width: 1px;\n    text-align: center;\n    /* border-bottom-right-radius: ` +
      `5px; */\n    /* border-bottom-left-radius: 5px; */\n}\n\n#nav-collapsible {\n    backgro` +
      `und-image: linear-gradient(#3f2831,#3f2831 60%,#23322d);\n}\n\n.server-whisper {\n    co` +
      `lor: #66ccff;\n    text-shadow: 0px 0px 10px #66ccff, 0px 0px 10px #66ccff !important;\n` +
      `}\n\n.action {\n    font-style: italic;\n    color: #fe66ab;\n    text-shadow: 0px 0px 1` +
      `0px #fe66ab, 0px 0px 10px #fe66ab !important;\n}\n\n.label-success {\n    background-col` +
      `or: #4cb290;\n    border-radius: 1px 8px 1px 1px;\n}\n\n.userlist_item {\n    padding-le` +
      `ft:2.2px;\n}\n\n.glyphicon-time:before {\n    content: \"\\e023\";\n    color: #ccc!impo` +
      `rtant;\n}\n\n.glyphicon-star-empty:before {\n    content: \"\\e007\";\n    color: #ebd04` +
      `7!important;\n}\n\n.glyphicon-volume-off:before {\n    content: \"\\e036\";\n    color: ` +
      `#ec4d49!important;\n}\n\n.userlist_op {\n    color: #79d61d!important;\n}\n\n.userlist_o` +
      `wner {\n    color: #eb8c47!important;\n}\n\nspan:not(.userlist_op):not(.userlist_owner) ` +
      `> strong.username {\n  color: #0087c9;\n}\n\ndiv.userlist_item > span:not(.userlist_op):` +
      `not(.userlist_owner) {\n  color: #0087c9;\n}\n\n.dark-theme > .odd-message {\n  backgrou` +
      `nd-color: #141f1b;\n}\n\n.dark-theme > .even-message {\n  background-color: rgba(0, 0, 0` +
      `, 0.15);\n}\n\n.light-theme > .odd-message {\n  background-color: #ffffff;\n}\n\n.light-` +
      `theme > .even-message {\n  background-color: #f5f5f5;\n}\n\n.glyphicon {\n    font-weigh` +
      `t: 500;\n}\n\n.btn {\n    letter-spacing: .2px\n}\n\n/*.btn-group-sm>.btn, .btn-sm {\n  ` +
      `  padding: .1px 5px;\n}*/\n\n/*#fonts-btn {\n    display: flex;\n    height: 31px;\n    ` +
      `flex-direction: column;\n    justify-content: space-evenly;\n}*/\n\n#plmeta {\n    borde` +
      `r-radius:4px\n}\n\n.queue_entry {\n    border-radius:10px\n}\n\n.modal-header {\n    bor` +
      `der-radius: 20px\n}\n\n.modal-footer {\n    border-radius: 20px\n}\n\n.modal-content {\n` +
      `    border-radius: 20px;\n}\n\n#footer {\n    background-color: #171c1a!important;\n}\n` +
      `\n.btn {\n    background-image: linear-gradient(#fff0, #fff0, #fff0)!important;\n    bac` +
      `kground-color: #fff0;\n    border-color: #4cb290;\n}\n\n.btn-default:hover {\n    backgr` +
      `ound-color: #4cb290;\n    /*border-width:1.6px*/\n    /* transform: scale(1.1); */\n    ` +
      `/*backface-visibility: hidden; */\n    transition: all 0.3s;\n    /* box-shadow: 0px 0px` +
      ` 5px #4cb290, 0px 0px 10px #4cb290 !important; */\n    box-shadow: inset 0 0 0 50px #4cb` +
      `290, 0px 0px 10px #4cb290;\n}\n\n.btn-default:active {\n  transform: translate(0px, 2px)` +
      `;\n  -webkit-transform: translate(0px, 2px);\n}\n\n.queue_active {\n    border-width:3px` +
      `;\n    border-color:#ffd966;\n    background-image: linear-gradient(#8a919600, #7a828800` +
      `, #70787d00);\n    padding:4px;\n    transition: ease-out .7s!important;\n    border-lef` +
      `t-width:7px;\n    border-left-style:groove;\n    padding-top: 10px;\n    padding-bottom:` +
      ` 10px;\n    font-size: 12pt;\n}\n\n.queue_entry:hover {\n    transition: all .4s!importa` +
      `nt;\n    padding-left:6px;\n}\n\n.queue_entry {\n    transition: all .7s!important;\n}\n` +
      `\n.close {\n    padding-left:10px!important;\n}\n\n.profile-box, .user-dropdown, .emotel` +
      `ist-table td {\n    border-radius:10px;\n}\n\n#motd {\n    text-align: center;\n}\n\n.qu` +
      `eue_active.queue_temp {\n    background-color: #293d36bd;\n}\n\n.channel-emote:hover {\n` +
      `    transform: scale(1.4);\n    transition: all .4s!important;\n}\n\n.channel-emote {\n ` +
      `   transition: all .7s!important;\n}\n\n.embedimg:hover {\n    transform: scale(1.2);\n ` +
      `   transition: all .4s!important;\n}\n\n.embedimg {\n    transition: all .7s!important;` +
      `\n}\n\nimg:hover {\n    transform: scale(1.4);\n    transition: all .4s!important;\n}\n` +
      `\nimg {\n    transition: all .7s!important;\n}\n\n#motdlogo:hover {\n    transform: scal` +
      `e(1.0)!important;\n}\n\n/*#emotelistbtn {\n    background-image: url(https://cdn.discord` +
      `app.com/attachments/915490680468561990/947409745856315392/legacy_smile.png)!important;\n` +
      `    background-position: 50%;\n    background-repeat: no-repeat;\n    background-size: 1` +
      `8px;\n    width:34px\n}\n\n.glyphicon-picture:before {\n    content: \"\";\n}*/\n\n#drin` +
      `kcount {\n    background-color: #000000;\n    color: #ffffff;\n    border: 2px solid #94` +
      `d1bd!important;\n    font-weight: lighter;\n    font-style: italic;\n    background-imag` +
      `e: url(https://cdn.discordapp.com/attachments/915490680468561990/947608302202789958/trig` +
      `.gif)!important;\n    background-size: contain!important;\n    background: scroll;\n    ` +
      `border-radius: 10px;\n}\n\n.drink {\n    border: none;\n    font-style:italic;\n}\n\n::s` +
      `election {\n    color: #94d1bd;\n    background-color: #f4438961;\n}\n\n::-moz-selection` +
      ` {\n    color: #94d1bd;\n    background-color: #f4438961;\n}\n\n::-webkit-scrollbar{min-` +
      `height:10px;width:6px;background:transparent}\n::-webkit-scrollbar-thumb{background:#D8D` +
      `FE6;opacity:7;border-radius:1ex;}\n::-webkit-scrollbar-corner{background:#FFF}\n\n#cover` +
      `pl {\n    background-color:black!important;\n}\n\ninput.form-control[type=\"text\"], inp` +
      `ut.form-control[type=\"password\"], input.form-control[type=\"email\"], textarea.form-co` +
      `ntrol {\n    background-color: #141f1b !important;\n    border-radius: 10px;\n}\n\n#chat` +
      `header, #videowrap-header {\n    border-radius: 10px 10px 0px 0px;\n}\n\n.btn-danger:hov` +
      `er {\n    border-color:#e7201a!important\n}\n\n.btn-danger:hover {\n    box-shadow: 0px ` +
      `0px 5px #e7201a, 0px 0px 10px #e7201a !important;\n}\n\n.btn-success:hover {\n    border` +
      `-color:#42b142!important\n}\n\n.btn-success:hover {\n    box-shadow: 0px 0px 5px #42b142` +
      `, 0px 0px 10px #42b142 !important;\n}\n\n.btn-group>.btn:first-child:not(:last-child):no` +
      `t(.dropdown-toggle) {\n    border-bottom-left-radius: 4px;\n}\n\n.btn-group>.btn:last-ch` +
      `ild:not(:first-child):not(.dropdown-toggle) {\n    border-top-right-radius: 4px;\n}\n\n#` +
      `usercount {\n    text-align:center;\n}\n\n.table>tbody>tr>td, .table>tbody>tr>th, .table` +
      `>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {\n    padding:` +
      ` 8px;\n    line-height: 1.42857143;\n    vertical-align: top;\n    border-top: 1px solid` +
      ` #ccc;\n    background-color: #141f1b;\n}\n\n.table>thead>tr>th {\n    font-family: 'Qui` +
      `cksand', sans-serif;\n    vertical-align: bottom;\n    border-bottom: 2px solid #ccc;\n ` +
      `   font-weight: lighter;\n    font-size: 16px;\n}\n\n/* epic colors for specific members` +
      ` */\n.chat-msg-JohnRG123 .userlist_owner {\n    background-color:#66ccff;\n    border-ra` +
      `dius:5px;\n    padding-left:3px;\n    color: #2e576b!important;\n    text-shadow: 1px 0 ` +
      `10px #2e576b;\n}\n\n.chat-msg-MrDestructoidCyDJ .userlist_owner {\n    color: #eb47d0!im` +
      `portant;\n    text-shadow: 1px 0 10px #2e576b;\n}\n\n.chat-msg-IP0G .userlist_owner {\n ` +
      `   color: #00FFFF!important;\n    text-shadow: 2px 0 10px #00FFFF;\n}\n\n.chat-msg-spint` +
      `to .userlist_owner {\n    color: #01FFFF!important;\n    text-shadow: 1px 0 10px #01FFFF` +
      `;\n}\n\n.chat-msg-Zombsiee .userlist_owner {\n    color: #ffd966!important;\n    text-sh` +
      `adow: 0px 0px 10px rgb(255 217 102)!important;\n}\n\n.chat-msg-jensai2 .userlist_op {\n ` +
      `   color: #ACABF8!important;\n    text-shadow: 1px 0 10px #ACABF8;\n}\n\n/* pride versio` +
      `n collapseabl\n\n.navbar-header {\n    background-image: linear-gradient(red,orange,` +
      `yellow,green,blue,purple);\n}\n*/`;
  bot.sendChatMsg(`${css.length}`);
  await bot.setCSS(css);
  // await bot.writeCSS(css);
});

COMMANDS.set('testcss', async (bot, username, msg) => {
  if (username != 'IP0G') {
    bot.sendChatMsg('You can not use this command WeirdMan');
    return;
  }
  const css = await bot.readTestCSS();
  const cssTS = css.toString();
  bot.sendChatMsg(`${cssTS.length}`);
  await bot.setCSS(cssTS);
});

COMMANDS.set(`excss`, async (bot, username, msg) => {
  if (!(await bot.checkPermission(username, Rank.ADMIN))) {
    bot.sendChatMsg(`${username} does not have permission to use this command WeirdMan`);
    return;
  }
  const opts = ['colorshift', 'main'];
  const opt = msg.split(' ')[0];

  if (opts.includes(opt)) {
    await bot.setExCSS(`https://ip0g.github.io/CyDJcss/${opt}.css`);
    bot.sendChatMsg(`Updated external css to ${opt}`);
  } else {
    bot.sendChatMsg(`${username}, ${opt} is not an available CSS opt. Opts: ${opts}`);
    return;
  }
});

let uuemotesrun = false;

COMMANDS.set('uuemotes', async (bot, username, msg) => {
  if (!(await bot.checkPermission(username, Rank.ADMIN))) {
    bot.sendChatMsg(`${username} does not have permission to use this command. FeelsWeirdMan`);
    return;
  }

  if (uuemotesrun === true) {
    bot.sendChatMsg(`${username}, an instance of this command is already running! guraDank`);
    return;
  } else if (uuemotesrun === false) {
    uuemotesrun = true;
  }

  const amount = msg.split(' ')[0];
  if (amount === '') {
    return bot.sendChatMsg('[b]Amount[/] must be provided for command');
  }

  const time = getCurrentUnixTimestamp();

  const emotesTCount = bot.channelEmotes.map((emote) => emote.name).length;
  bot.sendChatMsg(
      `Getting emotes used under [b]${amount}[/] times for ` +
      `[b]${emotesTCount}[/] emotes%^^%` +
      `Please wait, this may take a few minutes...`);

  let smsg = [];
  let returnAmount = 0;
  for (let i = 0; i < emotesTCount; i++) {
    const count = await bot.db.getEmoteCount(bot.channelEmotes.map((emote) => emote.name)[i]);
    if (count <= amount) {
      returnAmount = returnAmount + 1;
      if (smsg.length < 20) {
        smsg.push(bot.channelEmotes.map((emote) => emote.name)[i]);
      } else if ((smsg.length < 20) && (i = emotesTCount)) {
        smsg.push(bot.channelEmotes.map((emote) => emote.name)[i]);
        bot.sendChatMsg(`${smsg.join(' ')}`);
        smsg = [];
      } else {
        smsg.push(bot.channelEmotes.map((emote) => emote.name)[i]);
        bot.sendChatMsg(`${smsg.join(' ')}`);
        smsg = [];
      }
    }
  }

  const endTime = getCurrentUnixTimestamp();
  bot.sendChatMsg(
      `Found [b]${returnAmount}[/] emotes used [b]${amount}[/]` +
      ` times or less, in ${endTime - time}s`);

  await sleep(5000);
  uuemotesrun = false;
});
