/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    // Categoria: Aventura
    {
      name: 'The Hobbit',
      description: 'A fantasy novel about the journey of Bilbo Baggins.',
      author: 'J.R.R. Tolkien',
      price: 15.99,
      stock: 50,
      image_url: 'https://example.com/the-hobbit.jpg',
      category_id: 1
    },
    {
      name: 'Treasure Island',
      description: 'A young boy named Jim Hawkins goes on an adventure to find buried treasure.',
      author: 'Robert Louis Stevenson',
      price: 10.99,
      stock: 35,
      image_url: 'https://example.com/treasure-island.jpg',
      category_id: 1
    },
    // Adicione mais 3 livros da categoria Aventura aqui
    
    // Categoria: Terror
    {
      name: 'It',
      description: 'A group of children face an evil entity that preys on their town.',
      author: 'Stephen King',
      price: 19.99,
      stock: 20,
      image_url: 'https://example.com/it.jpg',
      category_id: 2
    },
    {
      name: 'The Shining',
      description: 'A man descends into madness while caretaking a haunted hotel.',
      author: 'Stephen King',
      price: 17.99,
      stock: 25,
      image_url: 'https://example.com/the-shining.jpg',
      category_id: 2
    },
    // Adicione mais 3 livros da categoria Terror aqui
    
    // Categoria: Romance
    {
      name: 'Pride and Prejudice',
      description: 'A classic romance between Elizabeth Bennet and Mr. Darcy.',
      author: 'Jane Austen',
      price: 12.99,
      stock: 45,
      image_url: 'https://example.com/pride-and-prejudice.jpg',
      category_id: 3
    },
    {
      name: 'The Notebook',
      description: 'A touching love story that spans decades.',
      author: 'Nicholas Sparks',
      price: 14.99,
      stock: 40,
      image_url: 'https://example.com/the-notebook.jpg',
      category_id: 3
    },
    // Adicione mais 3 livros da categoria Romance aqui
    
    // Categoria: Não Ficção
    {
      name: 'Sapiens',
      description: 'A brief history of humankind.',
      author: 'Yuval Noah Harari',
      price: 20.99,
      stock: 30,
      image_url: 'https://example.com/sapiens.jpg',
      category_id: 4
    },
    {
      name: 'Educated',
      description: 'A memoir about a woman who grows up in a strict and abusive household in rural Idaho but eventually escapes to learn about the wider world through education.',
      author: 'Tara Westover',
      price: 18.99,
      stock: 28,
      image_url: 'https://example.com/educated.jpg',
      category_id: 4
    },
    // Adicione mais 3 livros da categoria Não Ficção aqui
    
    // Categoria: Ficção Científica
    {
      name: 'Dune',
      description: 'A science fiction novel set in a distant future amidst a huge interstellar empire.',
      author: 'Frank Herbert',
      price: 22.99,
      stock: 60,
      image_url: 'https://example.com/dune.jpg',
      category_id: 5
    },
    {
      name: 'Neuromancer',
      description: 'A novel that tells the story of a washed-up computer hacker hired for one last job.',
      author: 'William Gibson',
      price: 16.99,
      stock: 38,
      image_url: 'https://example.com/neuromancer.jpg',
      category_id: 5
    },
    // Adicione mais 3 livros da categoria Ficção Científica aqui
    
    // Categoria: Fantasia
    {
      name: 'Harry Potter and the Sorcerer\'s Stone',
      description: 'The first book in the Harry Potter series, introducing Harry and his adventures at Hogwarts.',
      author: 'J.K. Rowling',
      price: 24.99,
      stock: 70,
      image_url: 'https://example.com/harry-potter1.jpg',
      category_id: 6
    },
    {
      name: 'A Game of Thrones',
      description: 'The first book in the A Song of Ice and Fire series, where families vie for control of the Iron Throne.',
      author: 'George R.R. Martin',
      price: 21.99,
      stock: 50,
      image_url: 'https://example.com/game-of-thrones.jpg',
      category_id: 6
    },
    // Adicione mais 3 livros da categoria Fantasia aqui
    
    // Categoria: Mistério
    {
      name: 'The Girl with the Dragon Tattoo',
      description: 'A mystery thriller novel about a journalist and a computer hacker.',
      author: 'Stieg Larsson',
      price: 14.99,
      stock: 55,
      image_url: 'https://example.com/girl-with-dragon-tattoo.jpg',
      category_id: 7
    },
    {
      name: 'Gone Girl',
      description: 'A thriller novel about a marriage gone terribly wrong.',
      author: 'Gillian Flynn',
      price: 18.99,
      stock: 35,
      image_url: 'https://example.com/gone-girl.jpg',
      category_id: 7
    },
    // Adicione mais 3 livros da categoria Mistério aqui
    
    // Categoria: Biografia
    {
      name: 'Steve Jobs',
      description: 'The biography of the co-founder of Apple Inc.',
      author: 'Walter Isaacson',
      price: 25.99,
      stock: 42,
      image_url: 'https://example.com/steve-jobs.jpg',
      category_id: 8
    },
    {
      name: 'The Diary of a Young Girl',
      description: 'The writings of Anne Frank, a Jewish girl who hid from the Nazis during World War II.',
      author: 'Anne Frank',
      price: 12.99,
      stock: 48,
      image_url: 'https://example.com/anne-frank.jpg',
      category_id: 8
    }
  ]);
};
