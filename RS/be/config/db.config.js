const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

let connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// connection.connect((error) => {
//     if (error) console.log(error);
//     else console.log('Connected to database');
// });

module.exports = connection;