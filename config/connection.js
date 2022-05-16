const mysql = require("mysql2");

//Create connection to MySQL database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Password22",
        database: "staff_hubDB",
    },
    console.log("Connected to the Staff Hub database.")
);

module.exports = db;