let mysql2=require("mysql2/promise")

let pool = mysql2.createPool({
    uri:process.env.DB_URI,
    waitForConnections:true,
    connectionLimit:10
})

module.exports=pool