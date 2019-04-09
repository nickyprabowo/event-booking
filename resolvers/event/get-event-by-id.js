const knex = require('knex')(require('../../knexfile'));
const transformEvent = require('./transformEvent');

const getEventById = id => knex
  .first('*')
  .from('events')
  .where({ id })
  .then(event => transformEvent(event))
  .catch((error) => {
    throw new Error(error);
  });

module.exports = getEventById;
