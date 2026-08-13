import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const API = import.meta.env.VITE_API_URL;

function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const entrar = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, clave }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Error al iniciar sesión');
      return;
    }

    localStorage.setItem('usuario', data.usuario);
    localStorage.setItem('racha_actual', data.racha_actual);
    localStorage.setItem('racha_maxima', data.racha_maxima);
    navigate('/inicio');
  };

  return (
    <div className="pagina">
      <img src="/messi.jpg" alt="" className="imagen-login" />
      <h1>Iniciar sesión</h1>
      <form onSubmit={entrar}>
        <input
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <Link to="/registro">Crear cuenta</Link>
    </div>
  );
}

export default Login;
