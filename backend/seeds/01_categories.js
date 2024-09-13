/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { id: 1, name: 'Aventura' },
    { id: 2, name: 'Terror' },
    { id: 3, name: 'Romance' },
    { id: 4, name: 'Não Ficção' },
    { id: 5, name: 'Ficção Científica' },
    { id: 6, name: 'Fantasia' },
    { id: 7, name: 'Mistério' },
    { id: 8, name: 'Biografia' }
  ]);
};
