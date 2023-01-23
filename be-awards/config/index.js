require('dotenv').config();
const { Pool } = require("pg");

exports.Load = () => {
  global.pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
    max: 80,
    min: 10,
  });
}
