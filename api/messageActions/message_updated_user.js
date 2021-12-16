const knex = require('../knex')

module.exports = async (payload) => {
  const { role, user_id, band_id } = JSON.parse(payload)
  const user = await knex.select('display_name').from('users').where('uid', user_id)
  const band = await knex.select('name').from('band').where('id', band_id)
  let metadata
  switch (role) {
    case 'REQUEST':
      metadata = JSON.stringify({ sender: user[0].displayName, senderId: user_id })
      await knex('message').insert({ message_type: 'MEMBER_REQUEST', metadata, band_id })
      break
    case 'INVITE':
      break
    case 'MEMBER':
      metadata = JSON.stringify({ sender: user[0].displayName, senderId: user_id })
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
