let { bot } = require("./bot")
let actions = require("./actions")

bot.start((ctx) => actions.strat(ctx))

bot.action(["Turbo", "GPT4"], (ctx) => actions.selectModel(ctx))

bot.action(['0', '1', '2'], (ctx) => actions.selectTemps(ctx))

bot.on("message", async (ctx) =>await actions.message)

bot.launch({ dropPendingUpdates: true });