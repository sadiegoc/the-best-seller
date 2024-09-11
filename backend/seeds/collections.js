/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('collections').del()
  await knex('collections').insert([
    { name: 'Harry Potter' },
    { name: 'A Song of Ice and Fire' },
    { name: 'Stephen Hawking' },
    { name: 'The Lord of the Rings' },
    { name: 'Sprawl Trilogy' }
  ]);
};
