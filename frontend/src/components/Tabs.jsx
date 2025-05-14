import React from 'react';

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <button onClick={() => setActiveTab('productos')} style={{ fontWeight: activeTab === 'productos' ? 'bold' : 'normal' }}>
        Productos
      </button>
      <button onClick={() => setActiveTab('usuarios')} style={{ fontWeight: activeTab === 'usuarios' ? 'bold' : 'normal' }}>
        Personas
      </button>
    </div>
  );
}

export default Tabs;