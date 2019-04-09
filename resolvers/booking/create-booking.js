const uuidv1 = require('uuid/v1');
const knex = require('knex')(require('../../knexfile'));
const transformBooking = require('./transformBooking');

const createBooking = async (args) => {
  const booking = {
    id: uuidv1(),
    user: '2d9e4be0-592d-11e9-8ce4-9bc4ce88487c',
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
