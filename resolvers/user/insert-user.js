const User = require('../../models/user');

const insertUser = user => User.insertUser(user)
  .then(() => Promise.resolve({
    id: user.id,
    email: user.email,
  }))
  .catch(error => Promise.reject(error));


module.exports = insertUser;
