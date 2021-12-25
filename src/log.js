const fs = require('fs');

function log(data) {
    fs.appendFileSync('/logs/updates.log', JSON.stringify({ ...data, timestamp: Date.now() }) + '\n');
}

module.exports = log;