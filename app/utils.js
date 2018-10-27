const exec = require('executive');
const msg = require('./errors');
const superagent = require('superagent');
const {writeToInflux} = require('simple-influx-http');

const UFW_LOG = '/var/log/ufw.log';
const PIHOLE_URL = 'http://localhost/admin/api.php';

/**
 * Superagent default params
 */
const request = () => {
    const agent = superagent.agent()
        .retry(3)
        .timeout({response: 5000, deadline: 10000});

    return agent;
};

/**
 * Convert anything to array
 * @param {*} elem to convert
 */
const convertToArray = elem => {
    return Array.isArray(elem) ? elem : [elem];
};

/**
 * Send command to bash
 * @param {String} str to send
 * @param {Object} opts
 * @param {Boolean} opts.titles add titles to output
 */
const run = async (cmds, opts = {}) => {
    const message = [];

    for (const cmd of convertToArray(cmds)) {
        const {stdout, stderr} = await exec.quiet(cmd);

        if (stdout) {
            message.push(opts.titles ? `[${cmd}]\n\n${stdout}` : stdout);
        } else {
            message.push(opts.titles ? `[ERROR: ${cmd}]\n\n${stderr}` : stderr);
        }
    }

    return message.join('\n\n');
};

/**
 * Cut numbers from stirng
 * @param {String} str
 */
const cutNumbers = str => Number(str.replace(/\D/gim, ''));

/**
 * Wait for some time
 * @param {Number} time in ms
 */
const nowWait = time => new Promise(resolve => setTimeout(resolve, time));

/**
 * Store data to influxdb
 * @param {Object} data to send
 */
const sendToInflux = async data => {
    try {
        await writeToInflux({
            url: 'http://localhost:8086',
            meas: 'pi3',
            db: data.db || 'hole',
            tags: data.tags,
            values: data.values,
        });
    } catch (err) {
        console.log(msg.influx.send(err));
    }
};

module.exports = {
    convertToArray,
    cutNumbers,
    nowWait,
    request,
    run,
    sendToInflux,
    PIHOLE_URL,
    UFW_LOG,
};
