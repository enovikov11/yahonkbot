const stickers = require('./stickers.json'), api = require('./api');

async function doHonk(update) {
    // Да, я знаю, что нужно будет декларировать /honkhonk перед /honk и мультикоманды будут баговать
    let command = Object.keys(stickers).filter(command => update?.message?.text?.includes(command))[0];

    if (update?.message?.new_chat_member) {
        command = 'new_chat_member';
    }

    if (update?.message?.new_chat_title) {
        command = 'new_chat_title';
    }

    if (update?.message?.left_chat_participant) {
        command = 'left_chat_participant';
    }

    if (update?.message?.pinned_message) {
        command = 'pinned_message';
    }

    await api('sendSticker', {
        chat_id: update.message.chat.id,
        sticker: (stickers[command] || stickers['/honk']).sticker,
        reply_to_message_id: update?.message?.message_id
    });
}

module.exports = doHonk;
