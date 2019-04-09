const knex = require('knex')(require('../../knexfile'));
const transformEvent = require('./transformEvent');

const getEvent = () => knex
  .select('*')
  .from('events')
  .then(events => events.map(event => transformEvent(event)))
  .catch((error) => {
    throw new Error(error);
  });

module.exports = getEvent;
