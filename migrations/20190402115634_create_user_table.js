exports.up = knex => knex.schema.createTable('user', (t) => {
  t.string('id').primary();
  t.string('email').notNullable();
  t.string('password').notNullable();
});

exports.down = knex => knex.schema.dropTableIfExists('user');
