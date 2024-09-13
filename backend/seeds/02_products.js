/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {
      name: 'The Hobbit',
      description: 'A prelude to The Lord of the Rings, following the journey of Bilbo Baggins as he discovers the One Ring.',
      author: 'J.R.R. Tolkien',
      price: 18.99,
      stock: 70,
      image_url: 'the-hobbit.jpg',
      category_id: 6
    },
    {
      name: 'The Lord of the Rings - The Fellowship of the Ring',
      description: 'The first part of The Lord of the Rings, where Frodo Baggins sets out on a quest to destroy the One Ring.',
      author: 'J.R.R. Tolkien',
      price: 19.99,
      stock: 60,
      image_url: 'the-lord-of-the-rings-1.jpg',
      category_id: 6
    },
    {
      name: 'The Lord of the Rings - The Two Towers',
      description: 'The second part of The Lord of the Rings, focusing on the separation of the fellowship and the battle against Sauron\'s forces.',
      author: 'J.R.R. Tolkien',
      price: 19.99,
      stock: 55,
      image_url: 'the-lord-of-the-rings-2.jpg',
      category_id: 6
    },
    {
      name: 'The Lord of the Rings - The Return of the King',
      description: 'The third part of The Lord of the Rings, concluding the journey of Frodo and the final battle for Middle-earth.',
      author: 'J.R.R. Tolkien',
      price: 19.99,
      stock: 50,
      image_url: 'the-lord-of-the-rings-3.jpg',
      category_id: 6
    },
    {
      name: 'Treasure Island',
      description: 'A young boy named Jim Hawkins goes on an adventure to find buried treasure.',
      author: 'Robert Louis Stevenson',
      price: 10.99,
      stock: 35,
      image_url: 'treasure-island.jpg',
      category_id: 1
    },
    {
      name: 'It',
      description: 'A group of children face an evil entity that preys on their town.',
      author: 'Stephen King',
      price: 19.99,
      stock: 20,
      image_url: 'it.jpg',
      category_id: 2
    },
    {
      name: 'The Shining',
      description: 'A man descends into madness while caretaking a haunted hotel.',
      author: 'Stephen King',
      price: 17.99,
      stock: 25,
      image_url: 'the-shining.jpg',
      category_id: 2
    },
    {
      name: 'Pride and Prejudice',
      description: 'A classic romance between Elizabeth Bennet and Mr. Darcy.',
      author: 'Jane Austen',
      price: 12.99,
      stock: 45,
      image_url: 'pride-and-prejudice.jpg',
      category_id: 3
    },
    {
      name: 'The Notebook',
      description: 'A touching love story that spans decades.',
      author: 'Nicholas Sparks',
      price: 14.99,
      stock: 40,
      image_url: 'the-notebook.jpg',
      category_id: 3
    },
    {
      name: 'Sapiens',
      description: 'A brief history of humankind.',
      author: 'Yuval Noah Harari',
      price: 20.99,
      stock: 30,
      image_url: 'sapiens.jpg',
      category_id: 4
    },
    {
      name: 'Educated',
      description: 'A memoir about a woman who grows up in a strict and abusive household in rural Idaho but eventually escapes to learn about the wider world through education.',
      author: 'Tara Westover',
      price: 18.99,
      stock: 28,
      image_url: 'educated.jpg',
      category_id: 4
    },
    {
      name: 'A Brief History of Time',
      description: 'A landmark volume in science writing by one of the great minds of our time, Stephen Hawking’s book explores the nature of time and the universe.',
      author: 'Stephen Hawking',
      price: 15.99,
      stock: 100,
      image_url: 'a-brief-history-of-time.jpg',
      category_id: 4
    },
    {
      name: 'Brief Answers to the Big Questions',
      description: 'Stephen Hawking\'s final book, addressing some of the biggest questions about the universe and our existence.',
      author: 'Stephen Hawking',
      price: 16.99,
      stock: 90,
      image_url: 'brief-answers-to-the-big-questions.jpg',
      category_id: 4
    },
    {
      name: 'My Brief History',
      description: 'Stephen Hawking\'s personal memoir, offering a glimpse into his life and career, from his childhood to his years as a scientist.',
      author: 'Stephen Hawking',
      price: 14.99,
      stock: 80,
      image_url: 'my-brief-history.jpg',
      category_id: 4
    },
    {
      name: 'The Universe in a Nutshell',
      description: 'A sequel to A Brief History of Time, this book delves deeper into the universe’s mysteries, with illustrations and Hawking\'s signature wit.',
      author: 'Stephen Hawking',
      price: 18.99,
      stock: 70,
      image_url: 'the-universe-in-a-nutshell.jpg',
      category_id: 4
    },
    {
      name: 'Dune',
      description: 'A science fiction novel set in a distant future amidst a huge interstellar empire.',
      author: 'Frank Herbert',
      price: 22.99,
      stock: 60,
      image_url: 'dune.jpg',
      category_id: 5
    },
    {
      name: 'Neuromancer',
      description: 'A groundbreaking novel in the cyberpunk genre, Neuromancer follows a washed-up computer hacker hired for one last job.',
      author: 'William Gibson',
      price: 12.99,
      stock: 50,
      image_url: 'neuromancer.jpg',
      category_id: 5
    },
    {
      name: 'Count Zero',
      description: 'The second book in the Sprawl trilogy, Count Zero continues exploring the cyberpunk world, focusing on three different protagonists.',
      author: 'William Gibson',
      price: 13.99,
      stock: 45,
      image_url: 'count-zero.jpg',
      category_id: 5
    },
    {
      name: 'Mona Lisa Overdrive',
      description: 'The final book in the Sprawl trilogy, Mona Lisa Overdrive ties together the storylines of the previous two books in a thrilling conclusion.',
      author: 'William Gibson',
      price: 14.99,
      stock: 40,
      image_url: 'mona-lisa-overdrive.jpg',
      category_id: 5
    },
    {
      name: 'Harry Potter and the Philosopher\'s Stone',
      description: 'The first book in the Harry Potter series, introducing Harry as he discovers he is a wizard and begins his education at Hogwarts.',
      author: 'J.K. Rowling',
      price: 19.99,
      stock: 50,
      image_url: 'harry-potter-1.jpg',
      category_id: 6
    },
    {
      name: 'Harry Potter and the Chamber of Secrets',
      description: 'The second book in the Harry Potter series, where Harry returns to Hogwarts and encounters the mystery of the Chamber of Secrets.',
      author: 'J.K. Rowling',
      price: 19.99,
      stock: 45,
      image_url: 'harry-potter-2.jpg',
      category_id: 6
    },
    {
      name: 'Harry Potter and the Prisoner of Azkaban',
      description: 'The third book in the Harry Potter series, focusing on Harry\'s third year at Hogwarts and the escape of Sirius Black.',
      author: 'J.K. Rowling',
      price: 19.99,
      stock: 40,
      image_url: 'harry-potter-3.jpg',
      category_id: 6
    },
    {
      name: 'Harry Potter and the Goblet of Fire',
      description: 'The fourth book in the Harry Potter series, where Harry competes in the Triwizard Tournament and Voldemort returns to power.',
      author: 'J.K. Rowling',
      price: 24.99,
      stock: 35,
      image_url: 'harry-potter-4.jpg',
      category_id: 6
    },
    {
      name: 'Harry Potter and the Order of the Phoenix',
      description: 'The fifth book in the Harry Potter series, detailing Harry\'s fifth year at Hogwarts and the rise of the Order of the Phoenix.',
      author: 'J.K. Rowling',
      price: 24.99,
      stock: 30,
      image_url: 'harry-potter-5.jpg',
      category_id: 6
    },
    {
      name: 'Harry Potter and the Half-Blood Prince',
      description: 'The sixth book in the Harry Potter series, where Harry learns more about Voldemort\'s past and prepares for the final battle.',
      author: 'J.K. Rowling',
      price: 24.99,
      stock: 25,
      image_url: 'harry-potter-6.jpg',
      category_id: 6
    },
    {
      name: 'Harry Potter and the Deathly Hallows',
      description: 'The seventh and final book in the Harry Potter series, concluding Harry\'s journey and the battle against Voldemort.',
      author: 'J.K. Rowling',
      price: 29.99,
      stock: 20,
      image_url: 'harry-potter-7.jpg',
      category_id: 6
    },
    {
      name: 'A Song of Ice and Fire - A Game of Thrones',
      description: 'The first book in the A Song of Ice and Fire series, introducing the Seven Kingdoms and the struggle for the Iron Throne.',
      author: 'George R.R. Martin',
      price: 22.99,
      stock: 60,
      image_url: 'a-song-of-ice-and-fire-1.jpg',
      category_id: 6
    },
    {
      name: 'A Song of Ice and Fire - A Clash of Kings',
      description: 'The second book in the A Song of Ice and Fire series, depicting the civil war among the factions in the Seven Kingdoms.',
      author: 'George R.R. Martin',
      price: 22.99,
      stock: 55,
      image_url: 'a-song-of-ice-and-fire-2.jpg',
      category_id: 6
    },
    {
      name: 'A Song of Ice and Fire - A Storm of Swords',
      description: 'The third book in the A Song of Ice and Fire series, featuring battles, betrayals, and the rise and fall of kings.',
      author: 'George R.R. Martin',
      price: 24.99,
      stock: 50,
      image_url: 'a-song-of-ice-and-fire-3.jpg',
      category_id: 6
    },
    {
      name: 'A Song of Ice and Fire - A Feast for Crows',
      description: 'The fourth book in the A Song of Ice and Fire series, focusing on the aftermath of the War of the Five Kings and the chaos it brings.',
      author: 'George R.R. Martin',
      price: 24.99,
      stock: 45,
      image_url: 'a-song-of-ice-and-fire-4.jpg',
      category_id: 6
    },
    {
      name: 'A Song of Ice and Fire - A Dance with Dragons',
      description: 'The fifth book in the A Song of Ice and Fire series, paralleling the events of A Feast for Crows and expanding on the fate of key characters.',
      author: 'George R.R. Martin',
      price: 26.99,
      stock: 40,
      image_url: 'a-song-of-ice-and-fire-5.jpg',
      category_id: 6
    },
    {
      name: 'The Girl with the Dragon Tattoo',
      description: 'A mystery thriller novel about a journalist and a computer hacker.',
      author: 'Stieg Larsson',
      price: 14.99,
      stock: 55,
      image_url: 'girl-with-dragon-tattoo.jpg',
      category_id: 7
    },
    {
      name: 'Gone Girl',
      description: 'A thriller novel about a marriage gone terribly wrong.',
      author: 'Gillian Flynn',
      price: 18.99,
      stock: 35,
      image_url: 'gone-girl.jpg',
      category_id: 7
    },
    {
      name: 'Steve Jobs',
      description: 'The biography of the co-founder of Apple Inc.',
      author: 'Walter Isaacson',
      price: 25.99,
      stock: 42,
      image_url: 'steve-jobs.jpg',
      category_id: 8
    },
    {
      name: 'The Diary of a Young Girl',
      description: 'The writings of Anne Frank, a Jewish girl who hid from the Nazis during World War II.',
      author: 'Anne Frank',
      price: 12.99,
      stock: 48,
      image_url: 'anne-frank.jpg',
      category_id: 8
    }
  ]);
};
