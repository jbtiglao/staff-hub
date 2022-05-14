const mysql = require("mysql2");

//Create connection to MySQL database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Password22",
        database: "employee_trackerDB",
    },
    console.log("Connected to the employee tracker database.")
);

module.exports = db;