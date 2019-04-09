const uuidv1 = require('uuid/v1');
const bcrypt = require('bcryptjs');
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

const checkUser = (user) => {
  return knex('user')
    .select('*')
    .where({ email: user.email })
    .then(result => Promise.resolve(result))
    .catch(error => Promise.reject(error));
};

const createUser = async (req) => {
  const hashedPassword = await bcrypt.hash(req.userInput.password, 12);
  const user = {
    id: uuidv1(),
    email: req.userInput.email,
    password: hashedPassword,
  };

  return checkUser(user)
    .then((check) => {
      if (!check.length) return insertUser(user);
    })
    .then(data => data)
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = createUser;
