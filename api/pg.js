const { Client } = require('pg')

let client

const { DATABASE, PG_USER, HOST, PG_PORT } = process.env

exports.getClient = async () => {
  if (!client) {
    client = new Client({
      database: DATABASE,
      user: PG_USER,
      password: '',
      host: HOST,
      port: PG_PORT,
    })

    await client.connect()
  }

  return client
}
