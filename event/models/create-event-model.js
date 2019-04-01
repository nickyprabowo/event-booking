const CreateEvent = (args) => {
  const event = {};
  event.id = args.id;
  event.title = args.title;
  event.description = args.description;
  event.price = args.price;
  event.date = args.date;
  return event;
};

module.exports = CreateEvent;
