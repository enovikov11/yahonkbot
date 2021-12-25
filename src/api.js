const fetch = require('node-fetch');

// https://core.telegram.org/bots/api
async function api(method, params) {
    return await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_KEY}/${method}`,
        { method: 'POST', body: JSON.stringify(params), headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json()).catch(() => ({ ok: false }));
}

module.exports = api;