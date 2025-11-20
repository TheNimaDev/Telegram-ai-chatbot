let keyboards = require("../keyboards")
const { isUsersFreeRequestsFinished, isUserHasAccess } = require("../repos")

module.exports = async (chatId, model) => {
    let hasAccess = await isUserHasAccess(chatId, model)

    if (hasAccess) {
        return {
            access: true
        }
    }

    let isUserReqFreeFinished = await isUsersFreeRequestsFinished(chatId)
    if (isUserReqFreeFinished) {
        return {
            access: false,
            message: "تعداد درخواست های رایگان شما تموم شده است!",
            keyboard: keyboards.endFreeRequestMessage
        }
    }
    return {
        access: true
    }
}