const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

const token = "7157811564:AAHuZARC0NUx5vhdcacoFuUkQ6bXUFyQ7ec"; // tg bot token
const webAppUrl = "https://10b0-37-115-89-248.ngrok-free.app"; // ngrok server link

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

const PORT = 5000;

bot.setMyCommands([{ command: "/play", description: "Начать игру" }]);

bot.onText(/\/play/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, { web_app: { url: webAppUrl + "/form" } });
});

app.listen(PORT, () => console.log("server started on PORT " + PORT));