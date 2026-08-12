import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { nombre, descripcion } = req.body;
    const result = await pool.query(
      'UPDATE items SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [nombre, descripcion, id]
    );
    res.status(200).json(result.rows[0]);
    return;
  }

  if (req.method === 'DELETE') {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.status(204).end();
    return;
  }

  res.status(405).end();
}
