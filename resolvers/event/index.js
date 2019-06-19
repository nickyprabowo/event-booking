const getEvents = require('./get-events');
const getEventById = require('./get-event-by-id');
const createEvent = require('./create-event');

module.exports = {
  allEvents: getEvents,
  getEventById,
  createEvent,
};
