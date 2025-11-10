const path = require("path")
let db = require("../db/mysql")
let fs = require("fs")

let migrate = async () => {
    let connection = await db.getConnection()
    try {
        let createUserTableSql = fs.readFileSync(path.join(__dirname, "./users-ddl.sql"),"utf-8")
        await connection.beginTransaction()
        connection.query(createUserTableSql)
        await connection.commit()
    } catch (error) {
        await connection.rollback()
        throw error
    }
}

migrate()
    .then(() => {
        console.log("migrate run successfully");
    })
    .catch((error) => {
        console.log(error);
        db.end()
    })