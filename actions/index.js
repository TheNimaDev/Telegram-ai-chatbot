let keyboards = require("../keyboards")
let redis = require("../db/redis")
let { createUser, getUser, incrementUsersRequestsFree, isUsersFreeRequestsFinished, addOrder, getPlans, getPlan, getOrder, getPlanById, addTrackIdToOrder, getOrderById, update, deleteOrder } = require("../repos")
let request = require("../utils/request")
let { Markup } = require("./../bot")
let zibal = require("../services/zibal")
let canUserSendRequest = require("../utils/canUserSendRequest")

let start = async (ctx) => {
    let isUserExists = await getUser(ctx.chat.id)
    if (!isUserExists) await createUser(ctx.chat.id)

    let payload = ctx.payload

    if (payload?.length) {
        let order = await getOrderById(payload)
        let verify = await zibal.verify(order.trackId)
        if (verify.result == 100) {
            let period = await redis.get(`user:${ctx.chat.id}:period`)
            await update(order.trackId, "done", period)

            ctx.reply("خرید با موفقیت تایید شد 🟢❤️")
        } else {
            ctx.reply("عملیات ناموفق 🔴💔")
            await update(order.trackId, "reject")
        }
    }

    await deleteOrder(ctx.chat.id, "pending")

    await redis.del(`user:${ctx.chat.id}:period`)
    await redis.del(`user:${ctx.chat.id}:plan`)

    if (ctx.match[0] == "start") {
        return ctx.reply("خوش اومدی به ربات چت بات!", keyboards.start())
    } else if (ctx.match[0] == "اتمام مکالمه") {
        return ctx.reply("عملیات مورد نظر خود را انتخاب کنید!", keyboards.start())
    }

    ctx.editMessageText("عملیات مورد نظر خود را انتخاب کنید!", keyboards.start())
}

let selectModel = (ctx) => {
    redis.set(`user:${ctx.chat.id}:model`, ctx.match[0])

    ctx.editMessageText("حالا حالت پاسخ دهی رو انتخاب کن:", keyboards.temps())
}

let selectTemps = (ctx) => {
    redis.set(`user:${ctx.chat.id}:mode`, ctx.match[0])
    ctx.editMessageText("سلام چه کمکی میتونم بهتون بکنم؟", keyboards.back())
}

let message = async (ctx) => {
    let model = await redis.get(`user:${ctx.chat.id}:model`)
    let mode = await redis.get(`user:${ctx.chat.id}:mode`)
    let messageId = ctx.message.message_id
    let text = ctx.message.text

    if (!model) return;


    let response = await canUserSendRequest(ctx.chat.id, model)

    if (!response.access) {
        return ctx.reply(response.message, response.keyboard())
    } else {

        ctx.reply("درخواست شما درحال پردازش است،لطفا چند لحضه صبر کنید!⏳")

        let response = await request(model, text, +mode)
        if (response?.error) {
            return ctx.reply(`!!خطا !!`, {
                reply_to_message_id: messageId,
                reply_markup: keyboards.message()
            })
        }

        if (response.isFreeReq) {
            await incrementUsersRequestsFree(ctx.chat.id)
        }

        ctx.reply(response, {
            reply_to_message_id: messageId,
            reply_markup: keyboards.message()
        }
        )
    }

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
    ctx.editMessageText("برای تکمیل خرید روی گزینه زیر کلیک کنید!", keyboards.payment())
}

let payment = async (ctx) => {
    let user = await getUser(ctx.chat.id)
    let order = await getOrder(user.id)
    let plan = await getPlanById(order.plan_id)
    let response = await zibal.createPayment({ price: plan.price, callbackUrl: `${process.env.callbackUrl}?start=${order.id}` })
    if (response.result != 100) {
        console.log({ error: "payment error", ...response });
        if (ctx.callbackQuery.message.text == "خطا!،دوباره تلاش کن") {
            return;
        }
        return ctx.editMessageText("خطا!،دوباره تلاش کن", keyboards.payment())
    }

    await addTrackIdToOrder(ctx.chat.id, response.trackId)

    let link = await zibal.createPaymentLink(response.trackId)

    ctx.editMessageText('پرداخت نهایی 💳', keyboards.finalPayment(link))
}

let end = async (ctx) => {
    await redis.del(`user:${ctx.chat.id}:model`)
    await redis.del(`user:${ctx.chat.id}:mode`)
    await ctx.reply("مکالمه با موفقیت به اتمام رسید.🟢", Markup.removeKeyboard())
    start(ctx)
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
    payment
}