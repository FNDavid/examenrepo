import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const result = await pool.query('SELECT * FROM items ORDER BY id DESC');
    res.status(200).json(result.rows);
    return;
  }

  if (req.method === 'POST') {
    const { nombre, descripcion } = req.body;
    const result = await pool.query(
      'INSERT INTO items (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    res.status(201).json(result.rows[0]);
    return;
  }

  res.status(405).end();
}
