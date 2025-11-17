let axios = require("axios")

let zibal = axios.create({
    baseURL: process.env.ZIBAL_BASE_API
})

exports.createPayment = async ({ price }) => {
    let response = await zibal.post("v1/request", {
        merchant: process.env.MERCHANT,
        amount: price,
        callbackUrl:process.env.CALLBACKURL,
    })

    return response.data
}