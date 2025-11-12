let { Markup } = require("./../bot")

exports.start = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('3.5 Turbo', 'Turbo'),
            Markup.button.callback('GPT 4', 'GPT4')
        ],[
            Markup.button.callback('خرید اشتراک', 'buyPlans')
        ]
    ])
}

exports.temps = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('نرمال', '1')
        ],
        [
            Markup.button.callback('خلاقانه', '2'), Markup.button.callback('دقیق', '0')
        ]
    ])
}

exports.message = () => {
    return {
        keyboard: [
            [{ text: "اتمام مکالمه" }]
        ],
        resize_keyboard: true
    }
}
exports.endFreeRequestMessage = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('خرید اشتراک', 'buyPlans')
        ]
    ])
}
exports.buyPlans = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('خرید اشتراک ویژه 🚀', 'vip_plan'),
        ],
        [
            Markup.button.callback('خرید اشتراک 3.5 Turbo', 'Turbo_plan'),
            Markup.button.callback('خرید اشتراک GPT 4', 'GPT4_plan')
        ]
    ])
}
exports.selectPeriod = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('7 روزه', '7'),
            Markup.button.callback('30 روزه', '30'),
        ],
        [
            Markup.button.callback('90 روزه', '90')
        ]
    ])
}
exports.confirmOrReject = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('تایید🟢','confirm'),
            Markup.button.callback('لغو🔴', 'reject'),
        ]
    ])
}