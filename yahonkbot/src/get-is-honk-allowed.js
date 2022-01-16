const { api } = require('./api'), lastHonkAtChat = {}, lastAdvertisedAtChat = {};

async function getIsHonkAllowed(update) {
    if (update?.message?.chat?.type === 'private') {
        return true;
    }

    if (process.env.DEBUG_DISABLE_COOLDOWN === 'true') {
        return true;
    }

    const timeAfterHonk = Date.now() - (lastHonkAtChat[update.message.chat.id] || 0),
        timeAfterAdvertisment = Date.now() - (lastAdvertisedAtChat[update.message.chat.id] || 0);

    if (timeAfterHonk > 5 * 60000) {
        lastHonkAtChat[update.message.chat.id] = Date.now();

        return true;
    }

    const chatMember = await api('getChatMember', {
        chat_id: Number(process.env.PREMIUM_CHAT_ID),
        user_id: update.message.from.id
    }), isPremium = ['member', 'owner'].includes(chatMember?.result?.status);

    if (isPremium) {
        if (timeAfterHonk > 2 * 60000) {
            lastHonkAtChat[update.message.chat.id] = Date.now();

            return true;
        } else {
            return false;
        }
    }

    if (timeAfterAdvertisment > 8 * 60 * 60 * 1000) {
        lastAdvertisedAtChat[update.message.chat.id] = Date.now();

        await api('sendMessage', {
            chat_id: update.message.chat.id,
            text: `С honk premium можно пускать гусей каждые 2 минуты. Сделал гусеугодное дело? Расскажи общественности и запусти опрос о выдаче тебе premium, а потом тегни t.me/enovikov11`,
            disable_web_page_preview: true,
            reply_to_message_id: update?.message?.message_id
        });
    }

    return false;
}

module.exports = getIsHonkAllowed;