import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { usuario, clave } = req.body;
  if (!usuario || !clave) {
    res.status(400).json({ error: 'Faltan datos' });
    return;
  }

  const existe = await pool.query('SELECT id FROM usuarios WHERE usuario = $1', [usuario]);
  if (existe.rows.length > 0) {
    res.status(409).json({ error: 'El usuario ya existe' });
    return;
  }

  const hash = await bcrypt.hash(clave, 10);
  await pool.query('INSERT INTO usuarios (usuario, clave) VALUES ($1, $2)', [usuario, hash]);
  res.status(201).json({ usuario });
}
