const knex = require('../knex')

module.exports = async (payload) => {
  const { role, user_id, band_id, approved_by } = JSON.parse(payload)
  const user = await knex.select('display_name').from('users').where('uid', user_id) // the user who was changed
  const band = await knex.select('name').from('band').where('id', band_id)
  let metadata
  switch (role) {
    case 'REQUEST': // someone requested to be part of a band
      metadata = JSON.stringify({ sender: user[0].display_name, senderId: user_id })
      await knex('message').insert({ message_type: 'MEMBER_REQUEST', metadata, band_id })
      break
    case 'INVITE': // someone was invited to be in a band
      break
    case 'MEMBER': // new member added
      const approver = await knex.select('display_name').from('users').where('uid', approved_by)
      metadata = JSON.stringify({
        sender: user[0].display_name,
        senderId: user_id,
        exclude: [approved_by, user_id],
        approved_by_name: approver[0]?.display_name,
      })
      const confirmInviteMetadata = JSON.stringify({ sender: band[0].name })
      await knex('message').insert({ message_type: 'NEW_MEMBER', metadata, band_id })
      await knex('message').insert({
        message_type: 'REQUEST_ACCEPTED',
        metadata: confirmInviteMetadata,
        user_id,
      })
    case 'SUPPORT':
      break
  }
}
