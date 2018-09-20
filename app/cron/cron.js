const cron = require('node-cron');
const c = require('require-all')(`${__dirname}/lib`);
const b = require('require-all')(`${__dirname}/../bot/cmd`);

/**
 * Schedule crons
 * @param {Object} bot telegram node api
 */
const run = bot => {
    // every minute
    cron.schedule('* * * * *', () => c.pi.usage());

    // every 5 minutes
    cron.schedule('*/5 * * * *', () => {
        c.dns.clients();
        c.dns.queries();
        c.dns.top();
    });

    // every hour
    cron.schedule('0 * * * *', () => b.dns.update());
    // every 5 hours
    cron.schedule('0 */5 * * *', () => c.pi.update(bot));

    // every day at 5:05
    cron.schedule('05 5 * * *', () => b.pi.reboot());
};

module.exports = run;
