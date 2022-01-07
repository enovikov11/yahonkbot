const { api } = require('./api'), lastHonkAtChat = {}, advertisedChats = new Set();

async function getIsHonkAllowed(update) {
    if (update?.message?.chat?.type === 'private') {
        return true;
    }

    if (process.env.DEBUG_DISABLE_COOLDOWN === 'true') {
        return true;
    }

    const timeAfterHonk = Date.now() - (lastHonkAtChat[update.message.chat.id] || 0);

    if (timeAfterHonk > 5 * 60000) {
        lastHonkAtChat[update.message.chat.id] = Date.now();

        advertisedChats.delete(update.message.chat.id);

        return true;
    }

    const chatMember = await api('getChatMember', {
        chat_id: Number(process.env.PREMIUM_CHAT_ID),
        user_id: update.message.from.id
    }), isPremium = chatMember?.result?.status === 'member';

    if (isPremium) {
        if (timeAfterHonk > 2 * 60000) {
            lastHonkAtChat[update.message.chat.id] = Date.now();

            advertisedChats.delete(update.message.chat.id);

            return true;
        } else {
            return false;
        }
    }

    if (!advertisedChats.has(update.message.chat.id)) {
        advertisedChats.add(update.message.chat.id);

        await api('sendMessage', {
            chat_id: update.message.chat.id,
            text: `С honk premium можно пускать гусей каждые 2 минуты. Жертвуешь на благотворительность 500 рублей в месяц? Пиши t.me/enovikov11 чтобы получить honk premium`,
            disable_web_page_preview: true,
            reply_to_message_id: update?.message?.message_id
        });
    }

    return false;
}

module.exports = getIsHonkAllowed;