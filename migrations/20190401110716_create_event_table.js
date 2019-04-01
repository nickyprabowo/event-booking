
exports.up = knex => knex.schema.createTable('events', (t) => {
  t.string('id').primary();
  t.string('title').notNullable();
  t.string('description').notNullable();
  t.integer('price').notNullable();
  t.datetime('date').notNullable();
});

exports.down = knex => knex.schema.dropTableIfExists('events');
