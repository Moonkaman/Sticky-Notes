exports.up = function(knex, Promise) {
  return knex.schema.createTable('text-notes', function(t){
    t.increments();

    t.integer('sticky_id')
    .unsigned()
    .references('id')
    .inTable('sticky-notes')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE');

    t.string('title');
    t.text('description');
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('text-notes');
};
