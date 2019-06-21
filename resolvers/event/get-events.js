const Event = require('../../models/event');
const transformEvent = require('./transformEvent');

const getEvents = async ({page = 0}) => {
  const limit = 5;
  const offset = page === 0 ? 0 : page*limit;
  const query = Event.getEvents()
  const getAllEvents = await query.clone().limit(limit).offset(offset).orderBy('created_at','desc');
  const events = getAllEvents.map(event => transformEvent(event));
  const getTotalEvents = await query.clone().count("id as total").first();
  return {
    events,
    total: Math.ceil(getTotalEvents.total / limit)
  };
};

module.exports = getEvents;
