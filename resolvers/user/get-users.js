const knex = require('knex')(require('../../knexfile'));

const getUsers = () => {
  const users = knex.select('*').from('user');

  return users.map(user => ({
    id: user.id,
    email: user.email,
  }));
};

module.exports = getUsers;
