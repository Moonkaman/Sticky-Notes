
exports.up = function(knex, Promise) {
  return knex.schema.createTable('friends', function(t){
    t.increments();
    t.integer('user_id')
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE');

    t.integer('friend_id')
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE');
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('friends');
};
