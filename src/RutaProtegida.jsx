import { Navigate } from 'react-router-dom';

function RutaProtegida({ children }) {
  const usuario = localStorage.getItem('usuario');
  return usuario ? children : <Navigate to="/login" />;
}

export default RutaProtegida;
