'use strict';

const restart = require('../pm/restart');
const {shell, repo} = require('utils-mad');

/** @returns {Promise} */
module.exports = async () => {
    const logs = [];

    const repoUpdate = [
        'rpi-tools-bot',
        'rpi-tools-cron',
        'magnet-co-parser',
    ];

    for (const app of repoUpdate) {
        logs.push(
            `>>> ${app} <<<`,
            await repo.update(app),
        );
    }

    logs.push(
        '>>> global <<<',
        // eslint-disable-next-line no-template-curly-in-string
        await shell.run('for package in $(npm -g outdated --parseable --depth=0 | cut -d: -f4); do if [[ ! ${package} =~ ^npm@ ]]; then echo "➡️  ${package}" && npm i -g ${package}; fi; done')
            || 'no updates',
        await restart(),
    );

    return logs;
};
