const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,           // Allows waiting for connections if the pool is busy
    connectionLimit: 10,                // Maximum number of connections in the pool
    queueLimit: 0 
});



module.exports = pool;


