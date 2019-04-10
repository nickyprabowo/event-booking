const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUserByEmail = require('../user/get-user-by-email');

const login = async ({ email, password }) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('User does not exist');
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error('Invalid Credentials');
  }

  const token = jwt.sign(
    { userId: user.disposer, email: user.email },
    'anakganteng',
    { expiresIn: '1h' },
  );

  return {
    userId: user.id,
    token,
    tokenExpiration: 1,
  };
};

module.exports = login;
