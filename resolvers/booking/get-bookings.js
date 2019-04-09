const knex = require('knex')(require('../../knexfile'));
const transformBooking = require('./transformBooking');

const getBookings = () => knex
  .select('*')
  .from('booking')
  .then(bookings => bookings.map(booking => transformBooking(booking)))
  .catch((error) => {
    throw new Error(error);
  });

module.exports = getBookings;
