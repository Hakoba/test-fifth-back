exports.up = (knex, Promise) => {
    return knex.schema.createTable('animes', (table) => {
      table.increments();
      table.string('name').notNullable().unique();
      table.string('genre').notNullable();
      table.integer('rating').notNullable();
      table.boolean('explicit').notNullable();
    });
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('animes');
  };
  