const { getClient } = require('./pg')
const messageUpdatedUser = require('./messageActions/message_updated_user')
const messageUpdatedTrack = require('./messageActions/message_updated_track')

module.exports = async () => {
  const client = await getClient()
  const queries = [
    'band_member_update',
    'track_update',
    'new_track'
  ]

  queries.forEach(query => {
    client.query(`LISTEN ${query}`)
  })

  client.on('notification', async ({ payload, channel, ...props }) => {
    switch (channel) {
      case ('band_member_update'): 
        messageUpdatedUser(payload)
        break;
      case ('track_update'):
      case ('new_track'):
        messageUpdatedTrack(channel, payload)
      default: console.warn(`${channel} was called but has no actions`)
    }
  })
}