const api = require('./api');

async function advertiseContributing(update) {
    if (update?.message?.sticker?.file_id) {
        await api('sendMessage', {
            chat_id: update.message.chat.id,
            text: `Ты прислал(а) стикер <code>${update?.message?.sticker?.file_id}</code>, хочешь добавить?\n` +
                `- Отредактируй https://github.com/enovikov11/yahonkbot/blob/master/src/stickers.json на свое усмотрение\n` +
                `- Собери лайки на странице своего пулл реквеста в гитхабе или телеграм опросе\n` +
                `- Покажи его t.me/enovikov11 и попроси обновить бота`,
            disable_web_page_preview: true,
            parse_mode: 'HTML',
            reply_to_message_id: update?.message?.message_id
        });
        return true;
    }
    return false;
}

module.exports = advertiseContributing;