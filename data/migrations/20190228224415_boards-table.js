exports.up = function(knex, Promise) {
  return knex.schema.createTable('boards', function(t){
    t.increments();

    t.integer('likes');

    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('boards');
};
