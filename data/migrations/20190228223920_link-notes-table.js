exports.up = function(knex, Promise) {
  return knex.schema.createTable('link-notes', function(t){
    t.increments();

    t.integer('sticky_id')
    .unsigned()
    .references('id')
    .inTable('sticky-notes')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE');

    t.string('url');
    t.string('title');
    t.text('description')
    t.string('type')
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('link-notes');
};
