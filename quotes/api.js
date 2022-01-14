const fetch = require('node-fetch');

async function api(method, params) {
    return await apiRaw(method, { body: JSON.stringify(params), headers: { 'Content-Type': 'application/json' } })
}

// https://core.telegram.org/bots/api
async function apiRaw(method, options) {
    return await fetch(
        `https://api.telegram.org/bot${process.env.QUOTES_TELEGRAM_KEY}/${method}`,
        { method: 'POST', ...options }
    ).then(res => res.json()).catch(() => ({ ok: false }));
}

module.exports = { api, apiRaw };