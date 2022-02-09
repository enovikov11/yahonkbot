const honk = { sticker: 'CAACAgIAAxkBAAMGYY5hWvbeBromqzV1dsCNa6OxmcUAAqQOAALRQIBJP9t-1zbIXXIiBA' },
    untitledGoose = {
        honk: { sticker: 'CAACAgIAAx0CUtT85gABA_qJYcZkqtG6DrqJKQcAAS9KIIjIo5PRAAIEAQACuHQEAAHN_C8FZstzYyME' },
        knife: { sticker: 'CAACAgIAAxkBAAOWYccSNZYtdNj-Xzg1QuUQoXhbk_YAAg4BAAK4dAQAAbx4Gygp34HjIwQ' },
        knifes: { sticker: 'CAACAgIAAxkBAAOaYccSbDuvQs8htk_dyg2ilQFDevUAArQBAAK4dAQAAQVNEL2-0G7ZIwQ' },
        warning: { sticker: 'CAACAgIAAxkBAAOcYccSfjPHZVGUwC67JqrC9nOaZnQAAh4BAAK4dAQAAQ2ohzBgNFraIwQ' }
    },
    funkyGoose = {
        angry: { sticker: 'CAACAgIAAxkBAAOeYccThrM7xktcnX-9Fogr3fJfkSEAAlAAA1KJkSPRgvFkFeEk2CME' },
        see: { sticker: 'CAACAgIAAxkBAAOgYccTpvEztmdQ5osAAR2e_Kd-orx1AAJcAANSiZEjVoQjitwpmnQjBA' },
        party: { sticker: 'CAACAgIAAxkBAAOiYccTtKvcL6ulN3B2VEb0WFgEvKIAAkAAA1KJkSM1XLo_etZCiSME' }
    },
    stonksGoose = { sticker: 'CAACAgIAAx0CUtT85gABBPA2YgPphip4QFM0m1Ve-YH0bNcbqnIAAqsTAAKDB1FLQLl2uQ_Jh8QjBA' },
    z1 = { sticker: 'CAACAgIAAxkBAAOmYccVvcLVPGaHMc1xpILb6zo1ubEAAukCAAL6n_EYZHuPCSxqegwjBA' },

    stickers = [
        { command: '/honk', answers: [honk], description: 'HONK' },
        { command: '/honkhonk', answers: [honk], description: 'HONK' },
        { command: '/roll', answers: [honk], description: 'HONK' },
        { command: '/adhonk', answers: [honk], description: 'HONK' },
        { command: '/stonks', answers: [stonksGoose], description: 'HONK' },
        { command: '/z1', answers: [z1], description: 'z1' },

        // Псевдокоманды, не анонсируются
        { command: '/join', answers: [untitledGoose.warning, funkyGoose.see, funkyGoose.party] },
        { command: '/leave', answers: [untitledGoose.knife, untitledGoose.knifes, funkyGoose.angry] },
        { command: '/rename', answers: [untitledGoose.honk] },

        // Сервисные команды
        { command: '/roll', description: 'Выбрать случайного хонкера чата' }
    ];

module.exports = stickers;
