import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductosCRUD() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '' });
  const [editando, setEditando] = useState(null);
  const [editProducto, setEditProducto] = useState({ nombre: '', precio: '' });

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const res = await axios.get('/api/productos');
    setProductos(res.data);
  };

  const crearProducto = async (e) => {
    e.preventDefault();
    await axios.post('/api/productos', nuevoProducto);
    setNuevoProducto({ nombre: '', precio: '' });
    obtenerProductos();
  };

  const eliminarProducto = async (id) => {
    await axios.delete(`/api/productos/${id}`);
    obtenerProductos();
  };

  const iniciarEdicion = (producto) => {
    setEditando(producto.id);
    setEditProducto({ nombre: producto.nombre, precio: producto.precio });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    await axios.put(`/api/productos/${editando}`, editProducto);
    setEditando(null);
    obtenerProductos();
  };

  return (
    <div>
      <h2>Productos</h2>
      <form onSubmit={crearProducto} style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={e => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          required
        />
        <input
          placeholder="Precio"
          type="number"
          value={nuevoProducto.precio}
          onChange={e => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
          required
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {editando === producto.id ? (
              <form onSubmit={guardarEdicion} style={{ display: 'inline' }}>
                <input
                  value={editProducto.nombre}
                  onChange={e => setEditProducto({ ...editProducto, nombre: e.target.value })}
                  required
                />
                <input
                  type="number"
                  value={editProducto.precio}
                  onChange={e => setEditProducto({ ...editProducto, precio: e.target.value })}
                  required
                />
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                {producto.nombre} - ${producto.precio}
                <button onClick={() => iniciarEdicion(producto)}>Editar</button>
                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductosCRUD;