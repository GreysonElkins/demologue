const knex = require('../knex')

module.exports = async (payload) => {
  const { role, user_id, band_id } = JSON.parse(payload)
  const user = await knex.select('display_name').from('users').where('uid', user_id)
  switch (role) {
    case 'REQUEST':
      const metadata = JSON.stringify({ sender: user[0].displayName, senderId: user_id })
      await knex('message').insert({ message_type: 'MEMBER_REQUEST', metadata, band_id })
      break
      case 'INVITE':
        break
        case 'MEMBER':
          const metadata = JSON.stringify({ sender: user[0].displayName, senderId: user_id })
          await knex('message').insert({ message_type: 'NEW_MEMBER', metadata, band_id })
      case 'SUPPORT':
        break
  }
}
