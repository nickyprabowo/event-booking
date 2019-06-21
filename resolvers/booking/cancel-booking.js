const Booking = require('../../models/booking');
const getEventById = require('../event/get-event-by-id');

const cancelBooking = (args) => {
  return Booking.cancelBooking({id: args.bookingId})
    .then(() => true)
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = cancelBooking;
