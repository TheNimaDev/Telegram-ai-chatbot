let { Markup } = require("./../bot")

exports.start = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('3.5 Turbo', 'Turbo'),
            Markup.button.callback('GPT 4', 'GPT4')
        ], [
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
            Markup.button.callback('خرید اشتراک ویژه 🚀', 'VIP_plan'),
        ],
        [
            Markup.button.callback('خرید اشتراک 3.5 Turbo', 'TURBO_plan'),
            Markup.button.callback('خرید اشتراک GPT 4', 'GPT4_plan')
        ]
    ])
}
exports.selectPeriod = (plans) => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback(` روزه ${plans[0].period} (${plans[0].price} تومان)`, '7'),
            Markup.button.callback(` روزه ${plans[1].period} (${plans[1].price} تومان)`, '30'),
        ],
        [
            Markup.button.callback(` روزه ${plans[2].period} (${plans[2].price} تومان)`, '90'),
        ]
    ])
}
exports.confirmOrReject = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('تایید🟢', 'confirm'),
            Markup.button.callback('لغو🔴', 'reject'),
        ]
    ])
}
exports.payment = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('تکمیل سفارش', 'payment'),
        ]
    ])
}
exports.finalPayment = (link) => {
    return Markup.inlineKeyboard([
        [
            Markup.button.url('پرداخت', link),
        ]
    ])
}