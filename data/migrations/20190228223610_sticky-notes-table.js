
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sticky-notes', function(t){
    t.increments();
    t.integer('board_id')
    .unsigned()
    .references('id')
    .inTable('board')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE');

    t.integer('user_id')
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE');

    t.string('state');
    t.integer('likes');
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sticky-notes');
};
