let { bot } = require("./bot")
let actions = require("./actions")

bot.start((ctx) => actions.strat(ctx))

bot.action(["Turbo", "GPT4"], (ctx) => actions.selectModel(ctx))

bot.launch({ dropPendingUpdates: true });