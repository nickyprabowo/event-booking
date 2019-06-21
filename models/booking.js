const knex = require('knex')(require('../knexfile'));

module.exports = {
    getBookings: () => knex("booking"),
    cancelBooking: ({id}) => knex('booking').where("id",id).del(),
    getBookingById: ({id}) => knex('booking').where("id", id).first("*")
}