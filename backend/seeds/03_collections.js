/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('collections').del()
  await knex('collections').insert([
    { id: 1, name: 'Harry Potter' },
    { id: 2, name: 'A Song of Ice and Fire' },
    { id: 3, name: 'Stephen Hawking' },
    { id: 4, name: 'The Lord of the Rings' },
    { id: 5, name: 'Sprawl Trilogy' }
  ]);
};
