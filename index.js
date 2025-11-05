let { bot } = require("./bot")
let actions = require("./actions")

bot.start((ctx) => actions.strat(ctx))

bot.launch({ dropPendingUpdates: true });