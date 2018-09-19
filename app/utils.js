const {influx} = require('./env');
const {msg} = require('./messages');
const {promisify} = require('util');
const exec = require('executive');
const fs = require('fs');
const superagent = require('superagent');

const readFile = promisify(fs.readFile);

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
 * @param {Boolean} notitle do not add title to output
 */
const run = async (cmds, notitle) => {
    const message = [];

    for (const cmd of convertToArray(cmds)) {
        const {stdout, stderr} = await exec.quiet(cmd);

        if (stdout) {
            message.push(notitle ? stdout : `[${cmd}]\n\n${stdout}`);
        } else {
            message.push(notitle ? stderr : `[ERROR: ${cmd}]\n\n${stderr}`);
        }
    }

    return message.join('\n\n');
};

/**
 * Cut numbers from stirng
 * @param {String} str
 */
const cutNumbers = str => {
    return Number(str.replace(/\D/gim, ''));
};

/**
 * Wait for some time
 * @param {Number} time in ms
 */
const nowWait = time => {
    return new Promise(resolve => setTimeout(resolve, time));
};

/**
 * Store data to influxdb
 * @param {String} tag to add
 * @param {Object} data to send
 */
const sendToInflux = async (tag, data) => {
    if (!data || Object.keys(data).length === 0) {
        console.log(msg.influx.send(tag, 'empty data', ''));
        return;
    }

    const dataToObject = [];

    for (const key in data) {
        dataToObject.push(`${key}=${Number(data[key]).toFixed(2)}`);
    }

    const send = dataToObject.join();

    try {
        await request()
            .post(`${influx.url}/write`)
            .query({db: influx.db})
            .send(`${influx.meas},${tag} ${send}`);

    } catch (err) {
        console.log(msg.influx.send(tag, send, err));
    }
};

/**
 * Read pi-hole web api password
 */
const getPiHoleApiPass = async () => {
    const file = await readFile('/etc/pihole/setupVars.conf');
    const [, pass] = file.toString().match(/WEBPASSWORD=(.+)\n/);
    return pass;
};

module.exports = {
    convertToArray,
    cutNumbers,
    getPiHoleApiPass,
    nowWait,
    request,
    run,
    sendToInflux,
};
