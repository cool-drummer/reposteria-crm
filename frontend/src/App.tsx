import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Categories from './pages/Categories';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Products />} />
          <Route path="inventario" element={<Inventory />} />
          <Route path="categorias" element={<Categories />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App; 