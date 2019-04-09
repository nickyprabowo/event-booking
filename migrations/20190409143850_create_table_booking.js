
exports.up = knex => knex.schema.createTable('booking', (t) => {
  t.string('id').primary();
  t.string('event').notNullable();
});

exports.down =  knex => knex.schema.dropTableIfExists('booking');

