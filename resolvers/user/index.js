const createUser = require('./create-user');
const getUsers = require('./get-users');

module.exports = {
  users: getUsers,
  createUser,
};
