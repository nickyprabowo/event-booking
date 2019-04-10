const knex = require('knex')(require('../../knexfile'));

const checkUser = (user) => {
  return knex('user')
    .select('*')
    .where({ email: user.email })
    .then(result => Promise.resolve(result))
    .catch(error => Promise.reject(error));
};

module.exports = checkUser;
