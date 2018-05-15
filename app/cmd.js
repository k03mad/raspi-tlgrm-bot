const {reply, keyboard} = require('./lib/bot/chat');
const c = require('require-all')(`${__dirname}/cmd`);
const {msg} = require('./lib/messages');

/**
 * Bot commands
 */
const cmd = bot => {
    reply(bot, 'help', c.help, 'bot');
    reply(bot, 'graph', c.graph);
    reply(bot, 'log', c.log);

    reply(bot, 'apt_update', c.apt.update);
    reply(bot, 'apt_upgrade', c.apt.upgrade);

    reply(bot, 'pi_reboot', c.pi.reboot);
    reply(bot, 'pi_shutdown', c.pi.shutdown);
    reply(bot, 'pi_stat', c.pi.stat, null, {parse_mode: 'Markdown'});

    reply(bot, 'wifi_devices', msg.common.choose, null, keyboard(['/wifi_devices_home', '/wifi_devices_knpl']));
    reply(bot, 'wifi_devices_home', c.wifi.devices, 'mad');
    reply(bot, 'wifi_devices_knpl', c.wifi.devices, 'knpl');

    reply(bot, 'wifi_reboot', msg.common.choose, null, keyboard(['/wifi_reboot_home', '/wifi_reboot_knpl']));
    reply(bot, 'wifi_reboot_home', c.wifi.reboot, 'mad');
    reply(bot, 'wifi_reboot_knpl', c.wifi.reboot, 'knpl');

    reply(bot, 'wifi_spots', c.wifi.spots, null, {parse_mode: 'Markdown'});
};

module.exports = cmd;
