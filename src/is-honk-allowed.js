const lastHonkAtChat = {};

function isHonkAllowed(update) {
    if (update?.message?.chat?.type === 'private') {
        return true;
    }

    if (process.env.DEBUG_DISABLE_COOLDOWN) {
        return true;
    }

    if (Date.now() - (lastHonkAtChat[update.message.chat.id] || 0) > 5 * 60000) {
        lastHonkAtChat[update.message.chat.id] = Date.now();
        return true;
    }

    return false;
}

module.exports = isHonkAllowed;