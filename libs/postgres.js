const { Client } = require('pg');

async function getConection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'ostricnano',
    password: 'root',
    database: 'my-store',
  });

  await client.connect();
  return client;
}

module.exports = getConection;