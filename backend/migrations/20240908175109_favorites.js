/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('favorites', table => {
        table.integer('uid').unsigned().notNullable()
        table.integer('pid').unsigned().notNullable()
        table.primary(['uid', 'pid']); // Define a chave primária composta
        table.foreign('uid').references('id').inTable('users').onDelete('CASCADE');
        table.foreign('pid').references('id').inTable('products').onDelete('CASCADE');
        table.timestamps(true, true); // Cria `created_at` e `updated_at` com timestamps automáticos
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('favorites')
};
