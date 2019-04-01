const uuidv1 = require('uuid/v1');
const knex = require('knex')(require('../../knexfile'));

const createEvent = req => new Promise((resolve) => {
  const event = {
    id: uuidv1(),
    title: req.eventInput.title,
    description: req.eventInput.description,
    price: req.eventInput.price,
    date: req.eventInput.date,
  };

  knex('events')
    .insert(event)
    .then(() => resolve(event))
    .catch(error => console.log('err', error));
});

module.exports = createEvent;
