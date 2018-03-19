require('./cron');

const {msg} = require('./lib/messages');
const {sendText, sendPhoto, sendMdText, q} = require('./lib/senders');
const {telegramToken, myChat} = require('./lib/env');
const {wl} = require('./lib/utils');
const c = require('require-all')(`${__dirname}/commands`);
const TelegramBot = require('node-telegram-bot-api');
const {getChartImageCor} = require('./lib/charts');

const bot = new TelegramBot(telegramToken, {polling: {
    interval: 3000,
    params: {allowed_updates: ['message']}
}});

// check raspberry updates at startup
(async () => {
    const updates = await c.apt.update();

    if (updates !== msg.common.updates) {
        bot.sendMessage(myChat, updates);
    }
})();

/* eslint-disable no-multi-spaces, func-call-spacing, space-in-parens, brace-style, max-statements-per-line, curly */

bot.onText( q('test'),         async mes => {if (wl(mes))  sendPhoto  (bot, mes,  await getChartImageCor()               );});

bot.onText( q('help'),               mes => {if (wl(mes))  sendText   (bot, mes,        c.help('bot')                    );});

bot.onText( q('apt_update'),   async mes => {if (wl(mes))  sendText   (bot, mes,  await c.apt.update()                   );});
bot.onText( q('apt_upgrade'),  async mes => {if (wl(mes))  sendText   (bot, mes,  await c.apt.upgrade()                  );});

bot.onText( q('pi_co2'),       async mes => {if (wl(mes))  sendMdText (bot, mes,  await c.pi.co2(),     'disablePreview' );});
bot.onText( q('pi_reboot'),    async mes => {if (wl(mes))  sendText   (bot, mes,  await c.pi.reboot()                    );});
bot.onText( q('pi_shutdown'),  async mes => {if (wl(mes))  sendText   (bot, mes,  await c.pi.shutdown()                  );});
bot.onText( q('pi_stat'),      async mes => {if (wl(mes))  sendMdText (bot, mes,  await c.pi.stat()                      );});

bot.onText( q('wifi_devices'), async mes => {if (wl(mes))  sendText   (bot, mes,  await c.wifi.devices()                 );});
bot.onText( q('wifi_reboot'),  async mes => {if (wl(mes))  sendText   (bot, mes,  await c.wifi.reboot()                  );});
bot.onText( q('wifi_spots'),   async mes => {if (wl(mes))  sendMdText (bot, mes,  await c.wifi.spots()                   );});
