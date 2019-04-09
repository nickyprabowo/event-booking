const knex = require('knex')(require('../../knexfile'));

const getUserById = id => knex
  .first('*')
  .from('user')
  .where({ id })
  .then(user => ({
    ...user,
    password: null,
  }))
  .catch((error) => {
    throw new Error(error);
  });

module.exports = getUserById;