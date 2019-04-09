const getUserById = require('../user/get-user-by-id');

// eslint-disable-next-line arrow-body-style
const transformEvent = (event) => {
  return {
    ...event,
    date: new Date(event.date).toISOString(),
    creator: getUserById(event.created_by),
  };
};

module.exports = transformEvent;
