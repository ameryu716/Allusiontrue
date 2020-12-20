const pg = require('pg');

const pool = new pg.Pool({
    database: process.env.key_db,
    user: process.env.key_user,
    password: process.env.key_pass,
    host: process.env.key_host,
    port: process.env.key_port,
    ssl: false
});

module.exports = pool;