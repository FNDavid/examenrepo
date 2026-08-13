import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

function fechaISO(date) {
  return date.toISOString().slice(0, 10);
}

app.post('/registro', async (req, res) => {
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
});

app.post('/login', async (req, res) => {
  const { usuario, clave } = req.body;
  const resultado = await pool.query(
    'SELECT id, usuario, clave, racha_actual, racha_maxima, ultimo_login::text AS ultimo_login FROM usuarios WHERE usuario = $1',
    [usuario]
  );
  const fila = resultado.rows[0];

  if (!fila || !(await bcrypt.compare(clave, fila.clave))) {
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    return;
  }

  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setUTCDate(hoy.getUTCDate() - 1);
  const hoyStr = fechaISO(hoy);
  const ayerStr = fechaISO(ayer);

  let rachaActual = fila.racha_actual;

  if (fila.ultimo_login === hoyStr) {
  } else if (fila.ultimo_login === ayerStr) {
    rachaActual = rachaActual + 1;
  } else {
    rachaActual = 1;
  }

  const rachaMaxima = Math.max(fila.racha_maxima, rachaActual);

  await pool.query(
    'UPDATE usuarios SET racha_actual = $1, racha_maxima = $2, ultimo_login = $3 WHERE id = $4',
    [rachaActual, rachaMaxima, hoyStr, fila.id]
  );

  res.status(200).json({ usuario: fila.usuario, racha_actual: rachaActual, racha_maxima: rachaMaxima });
});

app.get('/racha/:usuario', async (req, res) => {
  const resultado = await pool.query(
    'SELECT usuario, racha_actual, racha_maxima FROM usuarios WHERE usuario = $1',
    [req.params.usuario]
  );
  if (resultado.rows.length === 0) {
    res.status(404).json({ error: 'No existe' });
    return;
  }
  res.status(200).json(resultado.rows[0]);
});

app.get('/', (req, res) => {
  res.send('servidor de racha activo');
});

const puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
  console.log('servidor corriendo en puerto ' + puerto);
});
