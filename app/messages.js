const moment = require('moment');

const commands = [
    '/help - this list',
    '/log - print forever log',
    '',
    '/apt_update - check for updates',
    '/apt_upgrade - install updates',
    '',
    '/dns_update - update dns filter',
    '',
    '/pi_reboot - reboot pi',
    '/pi_shutdown - shutdown pi',
    '',
    '/wifi_devices - wifi connected devices list',
    '/wifi_reboot - wifi spot reboot',
];

/**
 * Get current date
 */
const currentDate = () => `\n${moment().format('YYYY.MM.DD HH:mm:ss')}`;

const msg = {
    /* eslint-disable key-spacing, no-multi-spaces */
    common: {
        choose:     ()              => 'Choose network',
        converter:  unit            => `${currentDate()} no units "${unit}" found in converter`,
        emptyLog:                      'Log is empty',
        errDev:     (place, ex)     => `${currentDate()} get ${place} devices: ${ex}`,
        noDev:                         'No devices available',
        noVendor:   (mac, ex)       => `${currentDate()} get ${mac} mac vendor: ${ex}`,
        polling:    ex              => `${currentDate()} polling: ${ex}`,
        reboot:                        'Proceed to reboot',
        updates:                       'No updates available',
        vendor:     (mac, ex)       => `${currentDate()} get ${mac} vendor: ${ex}`,
    },
    cron: {
        dns:        (log, ex)       => `${currentDate()} get dns queries: ${ex}, log: ${log}`,
        dnsClients: ex              => `${currentDate()} get pihole top clients: ${ex}`,
        dnsDomains: (log, ex)       => `${currentDate()} get dns blocked domains: ${ex}, log: ${log}`,
        dnsTop:     ex              => `${currentDate()} get pihole top hosts: ${ex}`,
        dnsVar:     ex              => `${currentDate()} get pihole password var: ${ex}`,
        msToken:    ex              => `${currentDate()} get myshows token: ${ex}`,
        msStats:    ex              => `${currentDate()} get myshows stats: ${ex}`,
        temp:       ex              => `${currentDate()} get pi temp: ${ex}`,
        unknownDev: (place, dev)    => `Unknown device connected to the ${place} router:\n\n${dev}`,
        updErr:     ex              => `${currentDate()} get pi updates: ${ex}`,
        usage:      ex              => `${currentDate()} get pi usage: ${ex}`,
    },
    influx: {
        get:        (tag, data, ex) => `${currentDate()} getting "${tag}" with "${data}" from influx: ${ex}`,
        send:       (tag, data, ex) => `${currentDate()} sending "${tag}" with "${data}" to influx: ${ex}`,
    },
    readme: {
        badges:                        ['![Dependencies](https://david-dm.org/k03mad/raspberry-tools.svg)'],
        footer:                        '(⌐■_■)',
        header:                        'Telegram bot, crons, influx data writer, etc',
        md:                            'README.md generated',
        txt:                           'commands.txt generated',
    },
    send: {
        norm:       ex              => `${currentDate()} sending normal message: ${ex}`,
        photo:      ex              => `${currentDate()} sending photo message: ${ex}`,
        typing:     ex              => `${currentDate()} sending typing message: ${ex}`,
    },
};

module.exports = {commands, msg};
