let { start, temps } = require("../keyboards")
let db = require("../db")

exports.strat = (ctx) => {
    ctx.reply("خوش اومدی به ربات چت بات!", start())
}

exports.selectModel = (ctx) => {
    if (ctx.match[0] === 'GPT4') {
        db.set(`user:${ctx.chat.id}:model`, "gpt-4")
    } else if (ctx.match[0] === 'Turbo') {
        db.set(`user:${ctx.chat.id}:model`, "gpt-3.5-turbo")
    }

    ctx.editMessageText("حالا حالت پاسخ دهی رو انتخاب کن:", temps())
}

exports.selectTemps = (ctx) => {
    db.set(`user:${ctx.chat.id}:mode`, ctx.match[0])
    ctx.editMessageText("سلام چه کمکی میتونم بهتون بکنم؟")
}

exports.message = async (ctx) => {
    let model = await redis.get(`user:${ctx.chat.id}:model`)
    let mode = await redis.get(`user:${ctx.chat.id}:mode`)
    let messageId = ctx.message.message_id
    let text = ctx.message.text

    if (!model) return;

    //TODO call openai api and get the response
    let response = `این یک پاسخ تستی از مدل ${model} با حالت ${mode} برای پیام شما: ${text}`

    ctx.reply(response, {
        reply_to_message_id: messageId,
        reply_markup: {
            keyboard: [
                [{ text: "اتمام مکالمه" }]
            ],
            resize_keyboard: true
        }
    }
    )
}