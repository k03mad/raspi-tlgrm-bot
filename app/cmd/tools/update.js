'use strict';

const restart = require('../pm/restart');
const {repo} = require('utils-mad');

module.exports = async () => {
    const apps = [
        'rpi-tools-bot', 'rpi-tools-cron', 'magnet-co-parser',
        'mikrotik-pptp-hidemy-ip', 'utils-mad',
        'adguard-home-lists-my',
    ];

    const logs = await Promise.all(apps.map(app => repo.update(app)));
    logs.push(await restart());

    return logs;
};
