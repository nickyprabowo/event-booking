const knex = require('knex')(require('../../knexfile'));

const getBookingById = id => knex
  .first('*')
  .from('booking')
  .where({ id });

module.exports = getBookingById;
