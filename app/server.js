const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// The Pool will use the environment variables to connect
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // This will be 'db' (the service name)
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/', async (req, res) => {
  try {
    const time = await pool.query('SELECT NOW()');
    res.send(`Database time is: ${time.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});