import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Inicio from './pages/Inicio';
import Items from './pages/Items';
import RutaProtegida from './RutaProtegida';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/inicio"
          element={
            <RutaProtegida>
              <Inicio />
            </RutaProtegida>
          }
        />
        <Route
          path="/items"
          element={
            <RutaProtegida>
              <Items />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
