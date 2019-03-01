exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(t){
    t.increments();

    t.integer('user_id')
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE');

    t.integer('board_id')
    .unsigned()
    .references('id')
    .inTable('boards')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE');

    t.integer('likes');

    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comments');
};