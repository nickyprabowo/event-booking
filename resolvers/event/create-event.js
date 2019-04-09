const uuidv1 = require('uuid/v1');
const knex = require('knex')(require('../../knexfile'));
const transformEvent = require('./transformEvent');

const createEvent = (req) => {
  const event = {
    id: uuidv1(),
    title: req.eventInput.title,
    description: req.eventInput.description,
    price: req.eventInput.price,
    date: req.eventInput.date,
    created_by: req.eventInput.created_by,
  };

  return knex('events')
    .insert(event)
    .then(() => transformEvent(event))
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = createEvent;
