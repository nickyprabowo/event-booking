const knex = require('knex')(require('../knexfile'));

module.exports = {
  insertEvent: event => knex('events').insert(event),
  getEventById: id => knex.first('*').from('events').where({ id }),
  getEvents: (page = 1, limit = 5) => {
    return knex.select('*')
      .from('events')
      .limit(limit)
      .offset((page-1)*limit)
      .orderBy('created_at','desc')
  }
};
