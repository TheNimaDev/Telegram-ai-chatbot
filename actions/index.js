let { start,temps } = require("../keyboards")
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

    ctx.editMessageText("حالا حالت پاسخ دهی رو انتخاب کن:",temps())
}