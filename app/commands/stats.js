const exec = require('executive');

/**
 * Run command at bash
 */
const run = async command => {
    const cmd = await exec(command);
    return cmd.stdout;
};

/**
 * Get some stats
 */
const getStats = async () => {
    const stats = [];

    const gpuTemp = await run('vcgencmd measure_temp');
    stats.push(`GPU temp: ${gpuTemp.replace('temp=', '').replace('\'', '°')}`);

    const cpuTemp = await run('cat /sys/class/thermal/thermal_zone0/temp');
    stats.push(`CPU temp: ${(Number(cpuTemp) / 1000).toFixed(1)}°C`);

    let cpuUsage = await run('grep \'cpu \' /proc/stat');
    cpuUsage = cpuUsage.split(' ').map(elem => Number(elem));
    cpuUsage = (cpuUsage[2] + cpuUsage[4]) * 100 / (cpuUsage[2] + cpuUsage[4] + cpuUsage[5]);
    stats.push(`CPU usage: ${cpuUsage}`);

    // const ramUsage = await run('free -m | awk \'NR==2{printf "RAM usage: %s/%sMB (%.2f%%)\n", $3,$2,$3*100/$2 }\'');
    // stats.push(ramUsage);

    // const diskUsage = await run(`df -h | awk '$NF=="/"{printf "Disk Usage: %d/%dGB (%s)\n", $3,$2,$5}'`);
    // stats.push(diskUsage);

    return stats.join('\n');
};

module.exports = getStats;
