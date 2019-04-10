const uuidv1 = require('uuid/v1');
const bcrypt = require('bcryptjs');
const insertUser = require('./insert-user');
const checkUser = require('./check-user');

const createUser = async (req) => {
  const hashedPassword = await bcrypt.hash(req.userInput.password, 12);
  const user = {
    id: uuidv1(),
    email: req.userInput.email,
    password: hashedPassword,
  };

  return checkUser(user)
    // eslint-disable-next-line consistent-return
    .then((check) => {
      if (!check.length) {
        const insertedUser = insertUser(user);
        return insertedUser;
      }
      throw new Error('User already exists');
    })
    .then(data => data)
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = createUser;
