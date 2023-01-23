const config = require('../config')
async function Down() {
  config.Load();
  try {
    const client = await pool.connect()
    let query = `
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS catawards CASCADE;
      DROP TYPE IF EXISTS product_type;
    `
    await client.query(query);
    client.release();
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
}
Down();
