const { DATABASE, PG_USER, HOST, PG_PORT } = process.env

module.exports = require('knex')({
  client: 'pg',
  connection: {
    database: DATABASE,
    user: PG_USER,
    password: '',
    host: HOST,
    port: PG_PORT,
  },
})

