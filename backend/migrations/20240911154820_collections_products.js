/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('collections_products', table => {
        table.increments('id').primary()
        table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
        table.integer('collection_id').unsigned().references('id').inTable('collections').onDelete('CASCADE')
        table.unique(['product_id', 'collection_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('collections_products')
};
