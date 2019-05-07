const uuidv1 = require('uuid/v1');
const bcrypt = require('bcryptjs');
const insertUser = require('./insert-user');
const getUserByEmail = require('./get-user-by-email');

const createUser = async (args) => {
  const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
  const user = {
    id: uuidv1(),
    email: args.userInput.email,
    password: hashedPassword,
  };
  
  return getUserByEmail(user.email)
    .then((check) => {
      if (!check) {
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
