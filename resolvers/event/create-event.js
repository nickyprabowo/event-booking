const uuidv1 = require('uuid/v1');
const knex = require('knex')(require('../../knexfile'));
const transformEvent = require('./transformEvent');

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
    created_by: req.userId,
  };

  return knex('events')
    .insert(event)
    .then(() => transformEvent(event))
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = createEvent;
