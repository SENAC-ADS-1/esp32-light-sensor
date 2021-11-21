const pgp = require('pg-promise')();
const db = pgp({
  user: 'postgres',
  password: 'postgre',
  host: 'localhost',
  port: '5432',
  database: 'server_esp_32'
});

module.exports = db;
