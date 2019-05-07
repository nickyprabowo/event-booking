const Event = require('../../models/event');
const transformEvent = require('./transformEvent');

const getEvent = () => Event.getEvents()
  .then(events => events.map(event => transformEvent(event)))
  .catch((error) => {
    throw new Error(error);
  });

module.exports = getEvent;
