const puppeteer = require('puppeteer'), fs = require('fs'), html = fs.readFileSync('./render.html', 'utf-8'),
    exportedTitlesFilepath = '/titles-from-export/titles.json',
    updatesLogFilepath = '/logs/updates.log';

function render(messages) {
    function escapeHtml(html) {
        const node = document.createElement('div');
        node.innerText = html;
        return node.innerHTML;
    }

    document.body.innerHTML = '<div class="cards"></div>';
    const cards = document.querySelector('.cards');
    cards.style.height = 'unset';

    for (let i = 0; i < messages.length - 1; i++) {
        const titleDuration = (new Date(messages[i + 1].date) - new Date(messages[i].date)) / 60 / 60 / 1000,
            titleDiv = `<div class="card__title">${escapeHtml(messages[i].title)}</div>`,
            dateDiv = `<div class="card__date">${escapeHtml(messages[i].date.substr(0, 10))}</div>`,
            actorDiv = `<div class="card__actor">${escapeHtml(messages[i].actor)}</div>`,
            magnification = Math.max(0.9, Math.min(1.11, titleDuration / 12)),
            hue = 40 + Math.min(48, titleDuration) * 180 / 48,
            cardDiv = document.createElement('div');

        cardDiv.className = 'card';
        cardDiv.style.fontSize = magnification + 'em';
        cardDiv.style.flexBasis = 20 * magnification + 'vw';
        cardDiv.style.backgroundColor = `hsl(${hue}, 100%, 75%)`;
        cardDiv.innerHTML = titleDiv + dateDiv + actorDiv;

        cards.appendChild(cardDiv);

        if (cards.getBoundingClientRect().height > window.innerHeight) {
            cards.removeChild(cardDiv);
            cards.style.height = 'calc(100% - 2* var(--gap-size))';
            return { usedCards: cards.childNodes.length }
        }
    }

    return { notEnoughCards: true };
}

function getExistingIds() {
    const dir = fs.readdirSync('/results');
    return (dir.join(',').match(/\d+/g) || []).map(n => +n);
}

function getChatTitle(update) { return update && update.message && update.message.new_chat_title ? update.message.new_chat_title : null; }
function getChatId(update) { return update && update.message && update.message.chat && update.message.chat.id ? update.message.chat.id : null }
function getDate(update) { return update && update.message && update.message.date ? update.message.date : null }
function getFirstName(update) { return update && update.message && update.message.from && update.message.from && update.message.from.first_name ? update.message.from.first_name : null }
function getLastName(update) { return update && update.message && update.message.from && update.message.from && update.message.from.last_name ? update.message.from.last_name : null }

function readTitlesHistory() {
    const exportedTitles = JSON.parse(fs.readFileSync(exportedTitlesFilepath, 'utf-8'))
        .filter(({ action }) => action === 'edit_group_title')
        .map(({ date, title, actor }) => ({ date, title, actor }));

    const titlesFromUpdates = fs.readFileSync(updatesLogFilepath, 'utf-8').split('\n')
        .map(line => {
            try {
                return JSON.parse(line);
            } catch (e) {
                return {};
            }
        })
        .filter(({ update }) => getChatTitle(update) && String(getChatId(update)) === process.env.STATS_CHAT_ID)
        .map(({ update }) => ({
            date: new Date(getDate(update) * 1000).toISOString().substr(0, 19),
            title: getChatTitle(update),
            actor: getFirstName(update) + ' ' + getLastName(update)
        }));

    const mergedTitles = [...exportedTitles, ...titlesFromUpdates]
        .filter(({ date, title, actor }) => date && title && actor)
        .filter(({ title }, i, array) => i === 0 || (array[i - 1].title !== title));

    return mergedTitles;
}

async function makeImages() {
    let messages = readTitlesHistory(),
        i = 1,
        result = { usedCards: 0 };
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] }), ids = getExistingIds();

    while (messages.length > 0) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1280, deviceScaleFactor: 1.5 });

        await page.goto('data:text/html,' + html, { waitUntil: 'networkidle2' });

        result = await page.evaluate(render, messages);
        console.log({ result, i });

        if (result.usedCards) {
            messages = messages.splice(result.usedCards);
        }

        if (process.env.DEBUG_MAKE_ALL_IMAGES === 'true' || (!ids.includes(i) && messages.length > 0 && result.usedCards)) {
            await page.screenshot({ path: `/results/${i}.png` });
        }

        await page.close();
        if (!result.usedCards) { break; }
        i++;
    }

    await browser.close();
}

makeImages().catch(console.error);
