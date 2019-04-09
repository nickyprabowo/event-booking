const getEventById = require('../event/get-event-by-id');
const getUserById = require('../user/get-user-by-id');

const transformBooking = (booking) => {
  return {
    ...booking,
    event: getEventById(booking.event),
    user: getUserById(booking.user),
    created_at: new Date(booking.created_at).toISOString(),
    updated_at: '',
  };
};

module.exports = transformBooking;
