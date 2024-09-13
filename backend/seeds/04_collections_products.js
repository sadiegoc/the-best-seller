/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('collections_products').del()
  await knex('collections_products').insert([
    { collection_id: 1, product_id: 20 },
    { collection_id: 1, product_id: 21 },
    { collection_id: 1, product_id: 22 },
    { collection_id: 1, product_id: 23 },
    { collection_id: 1, product_id: 24 },
    { collection_id: 1, product_id: 25 },
    { collection_id: 1, product_id: 26 },

    { collection_id: 2, product_id: 27 },
    { collection_id: 2, product_id: 28 },
    { collection_id: 2, product_id: 29 },
    { collection_id: 2, product_id: 30 },
    { collection_id: 2, product_id: 31 },

    { collection_id: 3, product_id: 12 },
    { collection_id: 3, product_id: 13 },
    { collection_id: 3, product_id: 14 },
    { collection_id: 3, product_id: 15 },

    { collection_id: 4, product_id: 1 },
    { collection_id: 4, product_id: 2 },
    { collection_id: 4, product_id: 3 },
    { collection_id: 4, product_id: 4 },

    { collection_id: 5, product_id: 17 },
    { collection_id: 5, product_id: 18 },
    { collection_id: 5, product_id: 19 }
  ]);
};
