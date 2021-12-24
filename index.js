const fetch = require('node-fetch');

// https://core.telegram.org/bots/api
async function api(method, params) {
    return await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_KEY}/${method}`,
        { method: 'POST', body: JSON.stringify(params), headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json()).catch(() => ({ ok: false }));
}


const fs = require('fs');
function log(result) {
    fs.appendFileSync('/logs/updates.log', JSON.stringify({ ...result, timestamp: Date.now() }) + '\n');
}


let lastHonkAt = 0;

function isHonkAvailable(result) {
    if (result?.message?.chat?.type === 'private') {
        return true;
    }

    if (Date.now() - lastHonkAt > 5 * 60000) {
        lastHonkAt = Date.now();
        return true;
    }

    return false;
}


async function processResult(result) {
    try {
        let isHonkSuccessful = false;

        if (isHonkAvailable(result)) {
            isHonkSuccessful = true;

            await api('sendSticker', {
                chat_id: result.message.chat.id,
                sticker: 'CAACAgIAAxkBAAMGYY5hWvbeBromqzV1dsCNa6OxmcUAAqQOAALRQIBJP9t-1zbIXXIiBA',
            });
        }

        log({ result, isHonkSuccessful });
    } catch (e) {
        console.error(e);
    }
}


async function main() {
    let lastUpdateId = 0;
    while (true) {
        const updates = await api('getUpdates', { offset: lastUpdateId + 1, timeout: '30', allowed_updates: ['message'] });
        if (!updates.ok) { continue; }
        lastUpdateId = Math.max(...updates.result.map(item => item.update_id));
        updates.result.forEach(processResult);
    }
}


main().catch(console.error);
