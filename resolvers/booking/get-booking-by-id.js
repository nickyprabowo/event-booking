const Booking = require("../../models/booking");
const transformBooking = require('./transformBooking');

const getBookingById = id => {
  return Booking.getBookingById(id)
    .then(booking => transformBooking(booking))
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = getBookingById;
