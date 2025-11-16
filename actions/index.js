let keyboards = require("../keyboards")
let redis = require("../db/redis")
let { createUser, getUser, incrementUsersRequestsFree, isUsersFreeRequsetsFinished, addOrder, getPlans, getPlan } = require("../repos")
let request = require("../utils/request")
let { Markup } = require("./../bot")

let start = async (ctx) => {
    let isUserExists = await getUser(ctx.chat.id)
    if (!isUserExists) await createUser(ctx.chat.id)
    ctx.reply("خوش اومدی به ربات چت بات!", keyboards.start())
}

let selectModel = (ctx) => {
    if (ctx.match[0] === 'GPT4') {
        redis.set(`user:${ctx.chat.id}:model`, "gpt-4")
    } else if (ctx.match[0] === 'Turbo') {
        redis.set(`user:${ctx.chat.id}:model`, "gpt-3.5-turbo")
    }

    ctx.editMessageText("حالا حالت پاسخ دهی رو انتخاب کن:", keyboards.temps())
}

let selectTemps = (ctx) => {
    redis.set(`user:${ctx.chat.id}:mode`, ctx.match[0])
    ctx.editMessageText("سلام چه کمکی میتونم بهتون بکنم؟")
}

let message = async (ctx) => {
    let model = await redis.get(`user:${ctx.chat.id}:model`)
    let mode = await redis.get(`user:${ctx.chat.id}:mode`)
    let messageId = ctx.message.message_id
    let text = ctx.message.text

    if (!model) return;

    let isUserCanSendRequestFree = await isUsersFreeRequsetsFinished(ctx.chat.id)

    if (isUserCanSendRequestFree) {
        return ctx.reply("تعداد درخواست های رایگان شما تموم شده است!", {
            reply_to_message_id: messageId,
            reply_markup: keyboards.endFreeRequestMessage()
        })
    }

    ctx.reply("درخواست شما درحال پردازش است،لطفا چند لحضه صبر کنید!⏳")

    let response = await request(model, text, +mode)
    if (response?.error) {
        return ctx.reply(`!!خطا !!`)
    }

    ctx.reply(response, {
        reply_to_message_id: messageId,
        reply_markup: keyboards.message()
    }
    )
    await incrementUsersRequestsFree(ctx.chat.id)
}

let buyPlans = async (ctx) => {
    ctx.editMessageText("برای استفاده بیشتر یکی از پلن های زیر رو انتخاب کنید!", keyboards.buyPlans())
}

let selectPlan = async (ctx) => {
    let plan = ctx.match[0].split("_")[0]

    await redis.set(`user:${ctx.chat.id}:plan`, plan)

    let plans = await getPlans(plan)
    plans = plans.map(plan => ({ period: plan.period_plan, price: plan.price }))
    ctx.editMessageText("پلن چند روزه ؟", keyboards.selectPeriod(plans))
}

let selectPeriod = async (ctx) => {
    await redis.set(`user:${ctx.chat.id}:period`, ctx.match[0])

    let period = await redis.get(`user:${ctx.chat.id}:period`)
    let plan = await redis.get(`user:${ctx.chat.id}:plan`)

    ctx.editMessageText(`اشتراک ${period} روزه سرویس ${plan}`, keyboards.confirmOrReject())
}

let buyPlanConOrRej = async (ctx) => {
    if (ctx.match[0] === "reject") return start(ctx)

    let thePeriod = await redis.get(`user:${ctx.chat.id}:period`)
    let thePlan = await redis.get(`user:${ctx.chat.id}:plan`)

    let user = await getUser(ctx.chat.id)
    if (!user) return start(ctx)

    let plan = await getPlan(thePlan, thePeriod)
    if (!plan) return start(ctx)

    await addOrder(user.id, plan.id, ctx.chat.id)
    ctx.reply("//TODO")
}

let end = async (ctx) => {
    await redis.del(`user:${ctx.chat.id}:model`)
    await redis.del(`user:${ctx.chat.id}:mode`)
    ctx.reply("مکالمه با موفقیت به اتمام رسید.برای شروع مجدد /start را بزنید.", Markup.removeKeyboard())
}

module.exports = {
    start,
    selectModel,
    selectTemps,
    message,
    buyPlans,
    selectPlan,
    selectPeriod,
    buyPlanConOrRej,
    end,
}