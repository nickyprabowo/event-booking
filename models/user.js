const knex = require('knex')(require('../knexfile'));

module.exports = {
  getUserBy: key => knex.first('*').from('user').where(key),
  getUsers: () => knex.select('*').from('user'),
  insertUser: user => knex('user').insert(user),
  getUserById: id => knex.first('*').from('user').where({ id }),
};
