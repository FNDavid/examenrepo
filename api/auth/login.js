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
  const resultado = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
  const fila = resultado.rows[0];

  if (!fila || !(await bcrypt.compare(clave, fila.clave))) {
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    return;
  }

  res.status(200).json({ usuario: fila.usuario });
}
