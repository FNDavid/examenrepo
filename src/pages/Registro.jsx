import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Registro() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const registrar = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, clave }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Error al registrar');
      return;
    }

    navigate('/login');
  };

  return (
    <div className="pagina">
      <h1>Crear cuenta</h1>
      <form onSubmit={registrar}>
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
        <button type="submit">Registrarme</button>
      </form>
      {error && <p className="error">{error}</p>}
      <Link to="/login">Ya tengo cuenta</Link>
    </div>
  );
}

export default Registro;
