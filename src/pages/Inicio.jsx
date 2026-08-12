import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Inicio() {
  const usuario = localStorage.getItem('usuario');
  const navigate = useNavigate();

  const salir = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <div className="pagina">
      <h1>Hola, {usuario}</h1>
      <p>Bienvenido al sistema</p>
      <Link to="/items">Ir a la lista de items</Link>
      <button onClick={salir}>Cerrar sesión</button>
    </div>
  );
}

export default Inicio;
