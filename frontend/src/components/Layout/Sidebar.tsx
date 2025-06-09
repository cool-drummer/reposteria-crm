import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Cake as CakeIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Productos', icon: <CakeIcon />, path: '/productos' },
  { text: 'Inventario', icon: <InventoryIcon />, path: '/inventario' },
  { text: 'Categorías', icon: <CategoryIcon />, path: '/categorias' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Repostería Admin
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar; 