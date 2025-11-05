let { Markup } = require("./../bot")

exports.start = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('3.5 Turbo', 'Turbo'),
            Markup.button.callback('GPT 4', 'GPT4')
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