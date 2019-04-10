const createBooking = require('./create-booking');
const getBookings = require('./get-bookings');
const cancelBooking = require('./cancel-booking');

module.exports = {
  createBooking,
  bookings: getBookings,
  cancelBooking,
};
