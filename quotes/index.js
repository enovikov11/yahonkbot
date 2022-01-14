const { api } = require('./api'), fetch = require('node-fetch');

async function getPrice() {
    const quote = await fetch(`https://yfapi.net/v6/finance/quote?symbols=${process.env.QUOTES_TICKER}`, { headers: { 'x-api-key': process.env.QUOTES_API_KEY } }).then(res => res.json());
    const price = quote?.quoteResponse?.result[0]?.regularMarketPrice;
    if (!/^\d+\.\d{2}$/.test(String(price))) {
        throw new Error('bad price');
    }
    return price
}

async function update() {
    const chatData = await api('getChat', { chat_id: Number(process.env.QUOTES_CHAT_ID) });
    if (!chatData?.result?.title) {
        return;
    }

    const candidates = [...chatData?.result?.title.matchAll(/\b\d+\.\d{2}\b/g)].map(n => +n);
    const price = await getPrice();

    const validCandidates = candidates.filter(candidate => Math.max(candidate / price, price / candidate) < 1.3);

    if (validCandidates.length !== 1) { return; }

    const newTitle = chatData?.result?.title.replace(String(validCandidates[0]), price);

    if (newTitle !== chatData?.result?.title) {
        await api('setChatTitle', { chat_id: Number(process.env.QUOTES_CHAT_ID), title: newTitle });
    }
}

setInterval(update, 20 * 60 * 1000);
update().catch(console.error);