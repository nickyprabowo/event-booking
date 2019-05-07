const User = require('../../models/user');

const getUserByEmail = email => User.getUserBy({ email: email })
  .then(user => user)
  .catch((error) => {
    throw new Error(error);
  });

module.exports = getUserByEmail;
