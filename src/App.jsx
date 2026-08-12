import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editId, setEditId] = useState(null);

  const cargar = async () => {
    const res = await fetch('/api/items');
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/items/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, descripcion }),
      });
    } else {
      await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, descripcion }),
      });
    }
    setNombre('');
    setDescripcion('');
    setEditId(null);
    cargar();
  };

  const editar = (item) => {
    setEditId(item.id);
    setNombre(item.nombre);
    setDescripcion(item.descripcion || '');
  };

  const borrar = async (id) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    cargar();
  };

  return (
    <div className="contenedor">
      <h1>Lista de items</h1>

      <form onSubmit={guardar}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>
              <strong>{item.nombre}</strong> - {item.descripcion}
            </span>
            <div>
              <button onClick={() => editar(item)}>Editar</button>
              <button onClick={() => borrar(item.id)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
