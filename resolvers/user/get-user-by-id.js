const User = require('../../models/user');

const getUserById = id => User.getUserById(id)
  .then(user => ({
    ...user,
    password: null,
  }))
  .catch((error) => {
    throw new Error(error);
  });

module.exports = getUserById;