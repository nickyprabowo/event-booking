const uuidv1 = require('uuid/v1');
const transformEvent = require('./transformEvent');
const Event = require('../../models/event');
const moment = require('moment');

const createEvent = (args, req) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated user!');
  }

  const event = {
    id: uuidv1(),
    title: args.eventInput.title,
    description: args.eventInput.description,
    price: args.eventInput.price,
    date: args.eventInput.date,
    created_by: args.eventInput.created_by,
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
  };

  return Event.insertEvent(event)
    .then(() => transformEvent(event))
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = createEvent;
