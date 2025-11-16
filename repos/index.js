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
exports.getPlans = async (plan) => {
    try {
        let query = "SELECT * FROM plans WHERE plan=?"
        let [plans] = await db.query(query, [plan])

        return plans
    } catch (error) {
        throw error
    }
}
exports.addOrder = async (userId, planId, chatId) => {
    try {
        let createAt = Date.now()
        let query = "INSERT INTO orders(user_id,plan_id,chat_id,create_at) VALUES (?,?,?,?)"
        let [order] = await db.query(query, [userId, planId, chatId, createAt])
        return order
    } catch (error) {
        throw error
    }
}

exports.getPlan = async (plan, period) => {
    try {
        let query = "SELECT * FROM plans WHERE plan=? AND period_plan=?"
        let [plans] = await db.query(query, [plan, period])

        return plans[0]
    } catch (error) {
        throw error
    }
}