const knex = require('knex')(require('../knexfile'));

module.exports = {
    getBookings: () => knex("booking")
}