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
