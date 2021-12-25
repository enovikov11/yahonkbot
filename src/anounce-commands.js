const stickers = require('./stickers.json'), api = require('./api');

async function anounceCommands() {
    await api('setMyCommands', {
        commands: Object.entries(stickers)
            .filter(([command]) => /^\//.test(command))
            .map(([command, { description }]) => ({ command: command.replace(/^\//, ''), description }))
    });
}

module.exports = anounceCommands;