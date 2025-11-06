let { bot } = require("./bot")
let actions = require("./actions")

bot.start((ctx) => actions.start(ctx))

bot.action(["Turbo", "GPT4"], (ctx) => actions.selectModel(ctx))

bot.action(['0', '1', '2'], (ctx) => actions.selectTemps(ctx))

bot.hears("اتمام مکالمه", async (ctx) => actions.end(ctx))

bot.on("message", async (ctx) => actions.message(ctx))

bot.launch({ dropPendingUpdates: true });