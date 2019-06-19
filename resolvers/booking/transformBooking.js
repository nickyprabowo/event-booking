const getEventById = require('../event/get-event-by-id');
const getUserById = require('../user/get-user-by-id');

const transformBooking = (booking) => {
  console.log(booking);
  return {
    ...booking,
    event: getEventById({id: booking.event}),
    user: getUserById({id: booking.user}),
    created_at: new Date(booking.created_at).toISOString(),
    updated_at: '',
  };
};

module.exports = transformBooking;
