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
exports.getOrder = async (userId) => {
    try {
        let query = "SELECT * FROM orders WHERE user_id=?"
        let [order] = await db.query(query, [userId])
        return order[0]
    } catch (error) {
        throw error
    }
}
exports.getPlanById = async (planId) => {
    try {
        let query = "SELECT * FROM plans WHERE id=?"
        let [plan] = await db.query(query, [planId])
        return plan[0]
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
exports.addTrackIdToOrder = async (chatId, trackId) => {
    try {
        let query = "UPDATE orders SET trackId = ? WHERE chat_id=?"

        let [result] = await db.query(query, [trackId, chatId])

        return result
    } catch (error) {
        throw error
    }
}
exports.getOrderById = async (orderId) => {
    try {
        let query = "SELECT * FROM orders WHERE id=?"
        let [order] = await db.query(query, [orderId])

        return order[0]
    } catch (error) {
        throw error
    }
}
exports.update = async (trackId, status) => {
    try {
        let query = "UPDATE orders SET status = ? WHERE trackId=?"

        let [result] = await db.query(query, [status, trackId])

        return result
    } catch (error) {
        throw error
    }
}
exports.deleteOrder = async (chatId, status) => {
    try {
        let query = "DELETE FROM orders WHERE chat_id=? AND status=?"

        let [result] = await db.query(query, [chatId, status])

        return result
    } catch (error) {
        throw error
    }
}