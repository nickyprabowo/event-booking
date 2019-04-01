const express = require('express');

const router = express.Router();

const getEvents = require('./controllers/get-events');
const createEvent = require('./controllers/create-event');

router.get('/', getEvents);
router.post('/', createEvent);

module.exports = router;
