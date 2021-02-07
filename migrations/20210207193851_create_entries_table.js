exports.up = function(knex) {
  return knex.schema
    .createTable('entries', function (table) {
      table.increments('id');
      table.text('entry').notNullable();
      table.timestamp('entry_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('entries');
};

exports.config = { transaction: false };
