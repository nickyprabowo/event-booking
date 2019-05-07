const User = require('../../models/user');

const getUsers = () => {
  const users = User.getUsers();

  return users.map(user => ({
    id: user.id,
    email: user.email,
  }));
};

module.exports = getUsers;
