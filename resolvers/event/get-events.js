const Event = require('../../models/event');
const transformEvent = require('./transformEvent');

const getEvent = page => {
  return Event.getEvents(page)
    .then(events => events.map(event => transformEvent(event)))
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = getEvent;
