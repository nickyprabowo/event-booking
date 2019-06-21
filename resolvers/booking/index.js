const createBooking = require('./create-booking');
const getBookings = require('./get-bookings');
const getBookingById = require('./get-booking-by-id');
const cancelBooking = require('./cancel-booking');

module.exports = {
  createBooking,
  allBookings: getBookings,
  getBookingById: getBookingById,
  cancelBooking,
};
