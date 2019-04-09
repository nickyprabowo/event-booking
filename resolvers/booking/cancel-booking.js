const knex = require('knex')(require('../../knexfile'));
const getBookingById = require('./get-booking-by-id');
const getEventById = require('../event/get-event-by-id');

const cancelBooking = async (args) => {
  const booking = await getBookingById(args.bookingId);

  return knex('booking')
    .where({ id: args.bookingId })
    .del()
    .then(() => getEventById(booking.event))
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = cancelBooking;
