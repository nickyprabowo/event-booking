const Event = require('../../models/event');
const transformEvent = require('./transformEvent');

const getEvents = async ({page = 0}) => {
  const offset = page === 0 ? 0 : page*5;
  const query = Event.getEvents()
  const getAllEvents = await query.clone().limit(5).offset(offset).orderBy('created_at','desc');
  const events = getAllEvents.map(event => transformEvent(event));
  const getTotalEvents = await query.clone().count("id as total").first();
  return {
    events,
    total: Math.ceil(getTotalEvents.total / 5)
  };
};

module.exports = getEvents;
