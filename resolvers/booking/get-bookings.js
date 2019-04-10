const knex = require('knex')(require('../../knexfile'));
const transformBooking = require('./transformBooking');

const getBookings = (args, req) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated user!');
  }

  return knex
    .select('*')
    .from('booking')
    .then(bookings => bookings.map(booking => transformBooking(booking)))
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = getBookings;
