import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Items from './pages/Items';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
