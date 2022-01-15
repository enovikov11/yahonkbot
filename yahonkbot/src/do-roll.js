const fs = require('fs'), { api } = require('./api');

async function doRoll(update) {
    if (String(update?.message?.chat?.id) !== process.env.STATS_CHAT_ID || !update?.message?.text?.includes('/roll')) { return; }

    const allUpdatesDuplicatedText = fs.readFileSync('/logs/updates.log', 'utf-8') + fs.readFileSync('/logs/all-updates.log', 'utf-8'),
        allUpdates = allUpdatesDuplicatedText.split('\n').map(line => {
            try {
                return JSON.parse(line);
            } catch (e) {
                return {};
            }
        }),
        usernames = [...new Set(
            allUpdates
                .filter(({ update }) => String(update?.message?.chat?.id) === process.env.STATS_CHAT_ID)
                .map(({ update }) => update?.message?.from?.username)
                .filter(username => username)
        )];

    console.log(usernames);

    const username = usernames[Math.floor(Math.random() * usernames.length)];

    await api('sendMessage', {
        chat_id: update.message.chat.id,
        text: `t.me/${username}`,
        disable_web_page_preview: true,
        reply_to_message_id: update?.message?.message_id
    });
}

module.exports = doRoll;