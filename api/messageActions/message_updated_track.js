const knex = require('../knex')

module.exports = async (channel, payload) => {
  const { band_id, uploaded_by, track_id, title, working_title } = JSON.parse(payload)
  const band = await knex.select('name').from('band').where('id', band_id)

  let metadata = {
    sender: band[0].name,
    trackId: track_id,
    trackName: title || working_title || undefined,
  }
  switch (channel) {
    case 'track_update':
      // table could benefit from a json column tracking who updated when i.e. { [uid]: timestamp }
      // this would be the best way to exclude on an update without changing uploaded_by
      await knex('message').insert({
        message_type: 'UPDATED_TRACK',
        metadata: JSON.stringify(metadata),
        band_id,
      })
      break
    case 'new_track':
      metadata.exclude = [uploaded_by]
      await knex('message').insert({
        message_type: 'NEW_TRACK',
        metadata: JSON.stringify(metadata),
        band_id,
      })
      break
  }
}
