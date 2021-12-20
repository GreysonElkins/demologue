const knex = require('../knex')

module.exports = async (channel, payload) => {
  const { band_id, uploaded_by, id: track_id, title, working_title } = JSON.parse(payload)
  const band = await knex.select('name').from('band').where('id', band_id)
  const uploaded = await knex.select('display_name').from('users').where('uid', uploaded_by)
  let metadata = {
    sender: band[0].name,
    trackId: track_id,
    trackName: title || working_title || undefined,
    uploadedBy: uploaded[0].display_name
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

// {"id":17,"band_id":158,"uploaded_by":"CsA57hOL9IXWIaGe3MiElHfF7Gw1","track_url":"https://res.cloudinary.com/demologue/video/upload/v1640026522/band-tracks/vfilp9oudukkllmuldbk.mp3","updated_at":"2021-12-20T11:55:23.102","created_at":"2021-12-20T11:55:23.102","title":"","working_title":"Sneaks Under a Bridge","isPublic":false,"cloudinary_id":"band-tracks/vfilp9oudukkllmuldbk"}