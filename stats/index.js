const puppeteer = require('puppeteer'), fs = require('fs'), html = fs.readFileSync('./render.html', 'utf-8');

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

function filter(messages) {
    return messages
        .filter(({ action }) => action === 'edit_group_title')
        .filter(({ title }, i, array) => i === 0 || (array[i - 1].title !== title));
}

async function makeImages() {
    let messages = filter(JSON.parse(fs.readFileSync('/titles-from-export/titles.json', 'utf-8'))),
        i = 1,
        result = { usedCards: 0 };
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] }), ids = getExistingIds();

    while (messages.length > 0) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1280, deviceScaleFactor: 1.5 });

        await page.goto('data:text/html,' + html, { waitUntil: 'networkidle2' });

        result = await page.evaluate(render, messages);

        if (result.usedCards) {
            messages = messages.splice(result.usedCards);
        }

        if (!ids.includes(i) && messages.length > 0 && result.usedCards) {
            await page.screenshot({ path: `/results/${i}.png` });
        }

        await page.close();
        if (!result.usedCards) { break; }
        i++;
    }

    await browser.close();
}

makeImages().catch(console.error);
