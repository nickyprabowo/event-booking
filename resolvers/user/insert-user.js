const knex = require('knex')(require('../../knexfile'));

const insertUser = (user) => {
  return knex('user')
    .insert(user)
    .then(() => Promise.resolve({
      id: user.id,
      email: user.email,
    }))
    .catch(error => Promise.reject(error));
};

module.exports = insertUser;
