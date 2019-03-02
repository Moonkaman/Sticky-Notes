exports.up = function(knex, Promise) {
  return knex.schema.createTable('boards', function(t){
    t.increments();

    t.integer('user_id')
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE');

    t.string('title');

    t.integer('likes');

    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('boards');
};
