import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsuariosCRUD() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '', edad: '' });
  const [editando, setEditando] = useState(null);
  const [editUsuario, setEditUsuario] = useState({ nombre: '', email: '', edad: '' });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    const res = await axios.get('/api/usuarios');
    setUsuarios(res.data);
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    await axios.post('/api/usuarios', nuevoUsuario);
    setNuevoUsuario({ nombre: '', email: '', edad: '' });
    obtenerUsuarios();
  };

  const eliminarUsuario = async (id) => {
    await axios.delete(`/api/usuarios/${id}`);
    obtenerUsuarios();
  };

  const iniciarEdicion = (usuario) => {
    setEditando(usuario.id);
    setEditUsuario({ nombre: usuario.nombre, email: usuario.email, edad: usuario.edad });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    await axios.put(`/api/usuarios/${editando}`, editUsuario);
    setEditando(null);
    obtenerUsuarios();
  };

  return (
    <div>
      <h2>Personas</h2>
      <form onSubmit={crearUsuario} style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={e => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={nuevoUsuario.email}
          onChange={e => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
          required
        />
        <input
          placeholder="Edad"
          type="number"
          value={nuevoUsuario.edad}
          onChange={e => setNuevoUsuario({ ...nuevoUsuario, edad: e.target.value })}
          required
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {editando === usuario.id ? (
              <form onSubmit={guardarEdicion} style={{ display: 'inline' }}>
                <input
                  value={editUsuario.nombre}
                  onChange={e => setEditUsuario({ ...editUsuario, nombre: e.target.value })}
                  required
                />
                <input
                  type="email"
                  value={editUsuario.email}
                  onChange={e => setEditUsuario({ ...editUsuario, email: e.target.value })}
                  required
                />
                <input
                  type="number"
                  value={editUsuario.edad}
                  onChange={e => setEditUsuario({ ...editUsuario, edad: e.target.value })}
                  required
                />
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                {usuario.nombre} - {usuario.email} - {usuario.edad} años
                <button onClick={() => iniciarEdicion(usuario)}>Editar</button>
                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuariosCRUD;