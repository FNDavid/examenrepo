import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const entrar = (e) => {
    e.preventDefault();
    localStorage.setItem('usuario', usuario);
    navigate('/inicio');
  };

  return (
    <div className="pagina">
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
    </div>
  );
}

export default Login;
