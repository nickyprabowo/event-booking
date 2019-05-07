const Event = require('../../models/event');
const transformEvent = require('./transformEvent');

const getEventById = id => Event.getEventById(id)
  .then(event => transformEvent(event))
  .catch((error) => {
    throw new Error(error);
  });

module.exports = getEventById;
