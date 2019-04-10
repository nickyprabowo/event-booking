const knex = require('knex')(require('../../knexfile'));

const getUserByEmail = email => knex
  .first('*')
  .from('user')
  .where({ email })
  .then(user => user)
  .catch((error) => {
    throw new Error(error);
  });

module.exports = getUserByEmail;
