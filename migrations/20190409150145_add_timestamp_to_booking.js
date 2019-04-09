
exports.up = knex => knex.schema.table('booking', (t) => {
  t.timestamps();
});

exports.down = knex => knex.schema.table('booking', (t) => {
  t.dropTimestamps();
});
