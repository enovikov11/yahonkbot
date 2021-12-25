const api = require('./api');

async function doLoop(processUpdate) {
    let lastUpdateId = 0, isActive = false;

    while (true) {
        const updates = await api('getUpdates', { offset: lastUpdateId + 1, timeout: isActive ? '30' : '1', allowed_updates: ['message'] });
        if (!updates.ok) { continue; }

        lastUpdateId = Math.max(...updates.result.map(item => item.update_id));

        if (!isActive) {
            isActive = true;
            continue;
        }

        for (let i = 0; i < updates.result.length; i++) {
            try {
                await processUpdate(updates.result[i]);
            } catch (e) {
                console.error(e);
            }
        }
    }
}

module.exports = doLoop;
