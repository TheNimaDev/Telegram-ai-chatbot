let { bot } = require("./bot")
let actions = require("./actions")

bot.start((ctx) => actions.start(ctx))

bot.action("back", (ctx) => actions.start(ctx))

bot.action(["TURBO", "GPT4"], (ctx) => actions.selectModel(ctx))

bot.action("buyPlans", (ctx) => actions.buyPlans(ctx))

bot.action(["VIP_plan", "TURBO_plan", "GPT4_plan"], (ctx) => actions.selectPlan(ctx))

bot.action(["7", "30", "90"], (ctx) => actions.selectPeriod(ctx))

bot.action(['confirm', 'reject'], (ctx) => actions.buyPlanConOrRej(ctx))

bot.action("payment", (ctx) => actions.payment(ctx))

bot.action(['0', '1', '2'], (ctx) => actions.selectTemps(ctx))

bot.hears("اتمام مکالمه", async (ctx) => actions.end(ctx))

bot.on("message", async (ctx) => actions.message(ctx))

bot.launch({ dropPendingUpdates: true });