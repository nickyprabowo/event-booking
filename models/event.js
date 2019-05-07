const knex = require('knex')(require('../knexfile'));

module.exports = {
  insertEvent: event => knex('events').insert(event),
  getEventById: id => knex.first('*').from('events').where({ id }),
  getEvents: () => knex.select('*').from('events'),
};
