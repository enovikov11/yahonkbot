const stickers = require('./stickers.js'), api = require('./api');

function getText(update) {
    if (update?.message?.new_chat_member) {
        return '/join';
    }

    if (update?.message?.new_chat_title) {
        return '/rename';
    }

    if (update?.message?.left_chat_participant) {
        return '/leave';
    }

    return update?.message?.text || '';
}

async function doHonk(update) {
    const text = getText(update),
        { answers } = stickers
            .sort((a, b) => a.command.length < b.command.length ? 1 : -1)
            .filter(({ command }) => text.includes(command))[0]
            || stickers[0],
        answer = answers[Math.floor(Math.random() * answers.length)];

    if (answer.sticker) {
        await api('sendSticker', {
            chat_id: update.message.chat.id,
            sticker: answer.sticker,
            reply_to_message_id: update?.message?.message_id
        });
    }
}

module.exports = doHonk;
