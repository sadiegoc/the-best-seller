/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('description').notNullable()
        table.string('author').notNullable()
        table.float('price').unsigned().notNullable()
        table.integer('stock').unsigned().notNullable()
        table.string('image_url').notNullable()

        table.integer('category_id')
            .unsigned().notNullable()
            .references('id')
            .inTable('categories')
            .onDelete('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products')
};
