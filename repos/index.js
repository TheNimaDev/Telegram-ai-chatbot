let db = require("../db/mysql")

exports.createUser = async (chatId) => {
    try {
        let query = "INSERT INTO users(chat_id) VALUES (?)"
        let [user] = await db.query(query, [chatId])
        return user
    } catch (error) {
        throw error
    }
}
exports.getUser = async (chatId) => {
    try {
        let query = "SELECT * FROM users WHERE chat_id=?"
        let [user] = await db.query(query, [chatId])
        return user[0]
    } catch (error) {
        throw error
    }
}
exports.isUsersFreeRequestsFinished = async (chatId) => {
    try {
        let [user] = await db.query("SELECT * FROM users WHERE chat_id=?", [chatId])

        if (!user.length) return false

        user = user[0]
        return user.request_free >= process.env.FREE_REQUESTS_COUNT ? true : false
    } catch (error) {
        throw error
    }
}
exports.incrementUsersRequestsFree = async (chatId) => {
    try {
        let [user] = await db.query("SELECT * FROM users WHERE chat_id=?", [chatId])

        if (!user.length) return false

        user = user[0]
        await db.query("UPDATE users SET request_free = ? WHERE chat_id=?", [(user.request_free + 1), chatId])

        return true
    } catch (error) {
        throw error
    }
}