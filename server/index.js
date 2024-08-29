require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
const router = require("./routers/index");

const token = process.env.BOT_TOKEN; // tg bot token
const webAppUrl = process.env.WEB_APP_URL; // ngrok server link
const PORT = process.env.PORT; // server port

const bot = new TelegramBot(token, { polling: true });
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

bot.setMyCommands([{ command: "/start", description: "Почати гру" }]); // команда start

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === "/start") {
    bot.sendMessage(chatId, "Ласкаво прошу до моєї гри!", {
      reply_markup: {
        inline_keyboard: [[{ text: "Грати", web_app: { url: webAppUrl } }]],
      },
    });
  }
}); // відповідь на команду start

app.listen(PORT, () => console.log("server started on PORT " + PORT)); // запуск сервера
