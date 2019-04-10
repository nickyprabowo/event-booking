const eventResolver = require('./event');
const bookingResolver = require('./booking');
const userResolver = require('./user');
const authResolver = require('./auth');

module.exports = {
  ...eventResolver,
  ...bookingResolver,
  ...userResolver,
  ...authResolver,
};
