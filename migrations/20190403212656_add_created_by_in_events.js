
exports.up = knex => knex.schema.table('events', (t) => {
  t.string('created_by').notNullable();
});

exports.down = knex => knex.schema.table('events', (t) => {
  t.dropColumn('created_by');
});
