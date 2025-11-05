let { Telegraf, Markup } = require("telegraf")

let bot = new Telegraf(process.env.BOT_TOKEN)

module.exports = { bot, Markup }