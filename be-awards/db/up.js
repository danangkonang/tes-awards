const config = require('../config')
async function Up() {
  config.Load();
  try {
    const client = await pool.connect()
    let query = `
      CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL,
        email VARCHAR (225) NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (user_id)
      );
      DROP TYPE IF EXISTS product_type;
      CREATE TYPE product_type AS ENUM('vouchers', 'products', 'giftcard');
      CREATE TABLE IF NOT EXISTS awards(
        award_id SERIAL,
        awards_name VARCHAR (225) NOT NULL,
        awards_image VARCHAR (225) NOT NULL,
        poin INTEGER,
        award_type product_type NOT NULL,
        CONSTRAINT awards_pkey PRIMARY KEY (award_id)
      );
      
      INSERT INTO users
        (email)
      VALUES
        ('user1@email.com'),
        ('user2@email.com');
      
      INSERT INTO awards
        (awards_name, awards_image, poin, award_type)
      VALUES
      (
        'Gift Card 1',
        'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        10000,
        'vouchers'
      ),
      (
        'Gift Card 2',
        'https://images.unsplash.com/photo-1674229075821-e4b7d51b5269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        390000,
        'products'
      ),
      (
        'Gift Card 3',
        'https://plus.unsplash.com/premium_photo-1668472274328-cd239ae3586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        10000,
        'giftcard'
      ),
      (
        'Gift Card 4',
        'https://images.unsplash.com/photo-1674229075821-e4b7d51b5269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        280000,
        'products'
      ),
      (
        'Gift Card 4',
        'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        120000,
        'vouchers'
      ),
      (
        'Gift Card 5',
        'https://images.unsplash.com/photo-1674229075821-e4b7d51b5269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        90000,
        'products'
      ),
      (
        'Gift Card 5',
        'https://plus.unsplash.com/premium_photo-1668472274328-cd239ae3586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        20000,
        'giftcard'
      ),
      (
        'Gift Card 6',
        'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        10000,
        'vouchers'
      ),
      (
        'Gift Card 7',
        'https://images.unsplash.com/photo-1674229075821-e4b7d51b5269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        5000000,
        'products'
      ),
      (
        'Gift Card 8',
        'https://plus.unsplash.com/premium_photo-1668472274328-cd239ae3586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        250000,
        'giftcard'
      ),
      (
        'Gift Card 9',
        'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        300000,
        'vouchers'
      ),
      (
        'Gift Card 10',
        'https://images.unsplash.com/photo-1674229075821-e4b7d51b5269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        400000,
        'products'
      ),
      (
        'Gift Card 11',
        'https://plus.unsplash.com/premium_photo-1668472274328-cd239ae3586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        30000,
        'giftcard'
      ),
      (
        'Gift Card 12',
        'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        10000,
        'vouchers'
      ),
      (
        'Gift Card 13',
        'https://images.unsplash.com/photo-1674229075821-e4b7d51b5269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        50000,
        'products'
      ),
      (
        'Gift Card 14',
        'https://plus.unsplash.com/premium_photo-1668472274328-cd239ae3586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        2000000,
        'giftcard'
      ),
      (
        'Gift Card 15',
        'https://images.unsplash.com/photo-1674229075821-e4b7d51b5269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        80000,
        'products'
      ),
      (
        'Gift Card 16',
        'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        3000000,
        'vouchers'
      ),
      (
        'Gift Card 17',
        'https://plus.unsplash.com/premium_photo-1668472274328-cd239ae3586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        4000000,
        'giftcard'
      ),
      (
        'Gift Card 18',
        'https://images.unsplash.com/photo-1674229075821-e4b7d51b5269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        5000000,
        'products'
      ),
      (
        'Gift Card 19',
        'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        200000,
        'vouchers'
      ),
      (
        'Gift Card 20',
        'https://plus.unsplash.com/premium_photo-1668472274328-cd239ae3586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        10000,
        'giftcard'
      ),
      (
        'Gift Card 21',
        'https://images.unsplash.com/photo-1674229075821-e4b7d51b5269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        100000,
        'products'
      );
    `
    await client.query(query);
    client.release();
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
}
Up();