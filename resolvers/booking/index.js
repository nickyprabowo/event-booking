const createBooking = require('./create-booking');
const getBookings = require('./get-bookings');
const cancelBooking = require('./cancel-booking');

module.exports = {
  createBooking: args => createBooking(args),
  bookings: () => getBookings(),
  cancelBooking: args => cancelBooking(args),
};
