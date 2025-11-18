let axios = require("axios")

let zibal = axios.create({
    baseURL: process.env.ZIBAL_BASE_API
})

exports.createPayment = async ({ price, callbackUrl }) => {
    let response = await zibal.post("v1/request", {
        merchant: process.env.MERCHANT,
        amount: price,
        callbackUrl,
    })

    return response.data
}
exports.createPaymentLink = async (trackId) => {
    let link = `${process.env.ZIBAL_BASE_API}/start/${trackId}`
    return link
}