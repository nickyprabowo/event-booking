const uuidv1 = require('uuid/v1');
const knex = require('knex')(require('../../knexfile'));
const transformBooking = require('./transformBooking');

const createBooking = async (args, req) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated user!');
  }

  const booking = {
    id: uuidv1(),
    user: req.userId,
    event: args.eventId,
    created_at: new Date(),
  };

  return knex('booking')
    .insert(booking)
    .then(() => transformBooking(booking))
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = createBooking;
