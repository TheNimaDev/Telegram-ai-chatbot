let { Markup } = require("./../bot")

exports.start = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('3.5 Turbo', 'Turbo'),
            Markup.button.callback('GPT 4', 'GPT4')
        ]
    ])
}