const knex = require('knex')(require('../../knexfile'));

const getEvent = () => knex.select('*').from('event');

module.exports = getEvent;
