const {run} = require('../../lib/utils');

/**
 * Install updates
 */
const upgrades = async () => {
    const msg = [];

    const commands = [
        'sudo apt-get update',
        'sudo apt-get upgrade -y',
        'sudo apt-get autoremove -y',
        'sudo apt-get autoclean',
    ];

    for (const cmd of commands) {
        msg.push(`[${cmd}]\n\n${await run(cmd)}`);
    }

    return msg.join('\n\n');
};

module.exports = upgrades;
