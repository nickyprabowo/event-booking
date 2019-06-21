const Booking = require('../../models/booking');
const transformBooking = require('./transformBooking');

const getBookings = async (args, req) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated user!');
  }
  const limit = 5;
  const offset = args.page === 0 ? 0 : page*limit;
  const query = Booking.getBookings()
  const getAllBookings = await query.clone().limit(limit).offset(offset).orderBy('created_at','desc').where('user',args.userId);
  const bookings = getAllBookings.map(booking => transformBooking(booking));
  const getTotalBookings = await query.clone().count("id as total").first().where('user',args.userId);

  return {
    bookings,
    total: getTotalBookings.total !== 0 ? Math.ceil(getTotalBookings.total / limit) : 0
  }

};

module.exports = getBookings;
