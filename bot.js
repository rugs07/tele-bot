const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '7112412287:AAF0C35bDN_qj1tWD9GFATfpwQgZ_VG1eYA'; 
const bot = new TelegramBot(token, { polling: true });

console.log(bot, 'bot')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('build'));

const webAppUrl = 'https://tiger-coin.x1cryptoscripts.com/';

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Click below to visit our site:', {
        reply_markup: {
            inline_keyboard: [[{
                text: 'Open Tiger Coin',
                web_app: { url: webAppUrl } 
            }]]
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});