
exports.up = knex => knex.schema.table('events', (t) => {
    t.timestamps({useTimestamps: true, defaultToNow: true});
});
  
exports.down = knex => knex.schema.table('events', (t) => {
    t.dropTimestamps();
});
  