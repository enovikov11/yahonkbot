const stickers = require('./stickers.js'), { api } = require('./api');

async function anounceCommands() {
    await api('setMyCommands', {
        commands: stickers
            .filter(({ description }) => description)
            .map(({ command, description }) => ({ command, description }))
    });
}

module.exports = anounceCommands;
