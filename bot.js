const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '7112412287:AAF0C35bDN_qj1tWD9GFATfpwQgZ_VG1eYA'; 
const bot = new TelegramBot(token, { polling: true });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('build'));

const webAppUrl = 'https://tiger-coin.x1cryptoscripts.com/';


const customKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: 'Open Tiger Coin' }], 
      [{ text: '/help' }] 
    ],
    resize_keyboard: true, 
    one_time_keyboard: true, 
  },
};

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to Tiger Coin Bot! Click the button below to open the site or type /help for more info.', customKeyboard);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Here is a list of available commands:\n\n/start - Start the bot\n/help - Get help with commands\n\nClick "Open Tiger Coin" to visit our website.', {
        reply_markup: {
            inline_keyboard: [[{
                text: 'Open Tiger Coin',
                web_app: { url: webAppUrl },
            }]],
        },
    });
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === 'Open Tiger Coin') {
        bot.sendMessage(chatId, 'Click below to open the site', {
            reply_markup: {
                inline_keyboard: [[{
                    text: 'Open Tiger Coin',
                    web_app: { url: webAppUrl },
                }]],
            },
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
