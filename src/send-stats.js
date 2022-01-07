const fs = require('fs'), FormData = require('form-data'), { apiRaw } = require('./api');

async function sendStats(update) {
    if (String(update?.message?.chat?.id) === process.env.STATS_CHAT_ID && update?.message?.new_chat_title) {
        const ids = fs.readdirSync('/results')
            .filter(filename => /^\d+\.png$/.test(filename))
            .map(filename => +(filename.replace('.png', '')));

        if (ids.length > 0) {
            const id = Math.min(...ids);

            fs.renameSync(`/results/${id}.png`, `/results/${id}-sent.png`);
            const form = new FormData();

            form.append('chat_id', Number(process.env.STATS_CHAT_ID));
            form.append('caption', process.env.STATS_CAPTION);
            form.append('photo', fs.createReadStream(`/results/${id}-sent.png`));
            form.append('reply_to_message_id', update?.message?.message_id);

            await apiRaw('sendPhoto', { body: form, headers: form.getHeaders() });

            return true;
        }
    }

    return false;
}

module.exports = sendStats;