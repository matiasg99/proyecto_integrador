import React, { useState } from 'react';
import Tabs from './components/Tabs';
import ProductosCRUD from './components/ProductosCRUD';
import UsuariosCRUD from './components/UsuariosCRUD';

function App() {
  const [activeTab, setActiveTab] = useState('productos');

  return (
    <div className="App">
      <h1>Gestión de Productos y Personas</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'productos' ? <ProductosCRUD /> : <UsuariosCRUD />}
    </div>
  );
}

export default App;