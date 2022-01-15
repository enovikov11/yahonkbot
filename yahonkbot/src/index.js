const advertiseContributing = require('./advertise-contributing'), doHonk = require('./do-honk'),
    getIsHonkAllowed = require('./get-is-honk-allowed'), log = require('./log'), doLoop = require('./do-loop'),
    anounceCommands = require('./anounce-commands'), sendStats = require('./send-stats'), doRoll = require('./do-roll');

async function processUpdate(update) {
    const isAdvertised = await advertiseContributing(update), isSentStats = await sendStats(update);
    let isHonkSuccessful = false;

    await doRoll(update);

    if (!isAdvertised && !isSentStats) {
        isHonkSuccessful = await getIsHonkAllowed(update);
        if (isHonkSuccessful) {
            await doHonk(update);
        }
    }

    log({ update, isHonkSuccessful });
}

async function main() {
    await anounceCommands();
    await doLoop(processUpdate);
}

main().catch(console.error);
