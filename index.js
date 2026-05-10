const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {

    const chatId = msg.chat.id;
    const text = (msg.text || "").toLowerCase();

    if (text.includes('btc')) {

        bot.sendMessage(chatId,
`BTC SIGNAL

BUY: 103200
TP1: 104000
TP2: 105000
SL: 102500`);
    }

    if (text.includes('eth')) {

        bot.sendMessage(chatId,
`ETH SIGNAL

BUY: 2480
TP1: 2520
TP2: 2550
SL: 2440`);
    }

});