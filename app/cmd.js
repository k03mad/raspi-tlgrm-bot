const {reply} = require('./lib/chats');
const c = require('require-all')(`${__dirname}/cmd`);

/**
 * Bot commands
 */
const cmd = bot => {
    reply(bot, 'help', c.help('bot'));
    reply(bot, 'user', c.log());

    reply(bot, 'apt_update', c.apt.update());
    reply(bot, 'apt_upgrade', c.apt.upgrade());

    // reply(bot, 'pi_sensors', c.pi.sensors(), {parse_mode: 'Markdown'});
    // reply(bot, 'pi_reboot', c.pi.reboot());
    // reply(bot, 'pi_shutdown', c.pi.shutdown());
    // reply(bot, 'pi_stat', c.pi.stat(), {parse_mode: 'Markdown'});

    // reply(bot, 'wifi_devices_home', c.wifi.devices());
    // reply(bot, 'wifi_devices_knpl', c.wifi.devices({place: 'knpl'}));
    // reply(bot, 'wifi_reboot_home', c.wifi.reboot());
    // reply(bot, 'wifi_reboot_knpl', c.wifi.reboot({place: 'knpl'}));
    // reply(bot, 'wifi_spots', c.wifi.spots(), {parse_mode: 'Markdown'});
};

module.exports = cmd;
