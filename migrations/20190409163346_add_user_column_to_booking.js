
exports.up = knex => knex.schema.table('booking', (t) => {
  t.string('user').notNullable();
});
  
exports.down = knex => knex.schema.table('booking', (t) => {
  t.dropColumn('user');
});
