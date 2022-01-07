const advertiseContributing = require('./advertise-contributing'), doHonk = require('./do-honk'),
    isHonkAllowed = require('./is-honk-allowed'), log = require('./log'), doLoop = require('./do-loop'),
    anounceCommands = require('./anounce-commands'), sendStats = require('./send-stats');

async function processUpdate(update) {
    const isAdvertised = await advertiseContributing(update);
    const isSentStats = await sendStats(update);

    const isHonkSuccessful = !isAdvertised && !isSentStats && isHonkAllowed(update);

    if (isHonkSuccessful) {
        await doHonk(update);
    }

    log({ update, isHonkSuccessful });
}

async function main() {
    await anounceCommands();
    await doLoop(processUpdate);
}

main().catch(console.error);
