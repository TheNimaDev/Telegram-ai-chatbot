let { start, temps, message } = require("../keyboards")
let redis = require("../db/redis")
let { createUser, getUser } = require("../repos")
let request = require("../utils/request")
let { Markup } = require("./../bot")

exports.start = async (ctx) => {
    let isUserExists = await getUser(ctx.chat.id)    
    if (!isUserExists) await createUser(ctx.chat.id)
    ctx.reply("خوش اومدی به ربات چت بات!", start())
}

exports.selectModel = (ctx) => {
    if (ctx.match[0] === 'GPT4') {
        redis.set(`user:${ctx.chat.id}:model`, "gpt-4")
    } else if (ctx.match[0] === 'Turbo') {
        redis.set(`user:${ctx.chat.id}:model`, "gpt-3.5-turbo")
    }

    ctx.editMessageText("حالا حالت پاسخ دهی رو انتخاب کن:", temps())
}

exports.selectTemps = (ctx) => {
    redis.set(`user:${ctx.chat.id}:mode`, ctx.match[0])
    ctx.editMessageText("سلام چه کمکی میتونم بهتون بکنم؟")
}

exports.message = async (ctx) => {
    let model = await redis.get(`user:${ctx.chat.id}:model`)
    let mode = await redis.get(`user:${ctx.chat.id}:mode`)
    let messageId = ctx.message.message_id
    let text = ctx.message.text

    if (!model) return;

    ctx.reply("درخواست شما درحال پردازش است،لطفا چند لحضه صبر کنید!⏳")

    let response = await request(model, text, +mode)
    if (response?.error) {
        return ctx.reply(`!!خطا !!`)
    }

    ctx.reply(response, {
        reply_to_message_id: messageId,
        reply_markup: message()
    }
    )
}

exports.end = async (ctx) => {
    await redis.del(`user:${ctx.chat.id}:model`)
    await redis.del(`user:${ctx.chat.id}:mode`)
    ctx.reply("مکالمه با موفقیت به اتمام رسید.برای شروع مجدد /start را بزنید.", Markup.removeKeyboard())
}
