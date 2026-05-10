const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

async function getBTCPrice() {

    const res = await axios.get(
        'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
    );

    return parseFloat(res.data.price);
}

bot.on('message', async (msg) => {

    const chatId = msg.chat.id;
    const text = (msg.text || "").toLowerCase();

    if (text.includes('btc')) {

        const price = await getBTCPrice();

        bot.sendMessage(chatId,
`BTC LIVE SIGNAL

Price: ${price}

BUY: ${price}
TP: ${price + 500}
SL: ${price - 300}`);
    }

});