const { getClient } = require('./pg')
const messageUpdatedUser = require('./messageActions/message_updated_user')

module.exports = async () => {
  const client = await getClient()
  const queries = [
    'band_member_update'
  ]

  queries.forEach(query => {
    client.query(`LISTEN ${query}`)
  })

  client.on('notification', async ({ payload, channel }) => {
    switch (channel) {
      case ('band_member_update'): 
        messageUpdatedUser(payload)
        break;
      default: console.warn(`${channel} was called but has no actions`)
    }
  })
}