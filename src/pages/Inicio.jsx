import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const API = import.meta.env.VITE_API_URL;

function Inicio() {
  const usuario = localStorage.getItem('usuario');
  const navigate = useNavigate();
  const [racha, setRacha] = useState({
    racha_actual: localStorage.getItem('racha_actual') || 0,
    racha_maxima: localStorage.getItem('racha_maxima') || 0,
  });

  useEffect(() => {
    fetch(`${API}/racha/${usuario}`)
      .then((res) => res.json())
      .then((data) => setRacha(data));
  }, [usuario]);

  const salir = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="pagina">
      <h1>Hola, {usuario}</h1>

      <div className="panel-racha">
        <div className="tarjeta">
          <span className="numero">{racha.racha_actual}</span>
          <span>Racha actual</span>
        </div>
        <div className="tarjeta">
          <span className="numero">{racha.racha_maxima}</span>
          <span>Racha máxima</span>
        </div>
      </div>

      <button onClick={salir}>Cerrar sesión</button>
    </div>
  );
}

export default Inicio;
