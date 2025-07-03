// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
// 1️⃣ Import your logo
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <AppBar position="static" elevation={4} sx={{ backgroundColor: '#81b1ce' }}>
      <Toolbar>

        {/* 2️⃣ Logo on the left */}
        <Box
          component={Link}
          to="/add"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            mr: 4
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: 40, display: 'block' }}
          />
        </Box>

        {/* 3️⃣ Nav buttons */}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/add"
            color="inherit"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            New Treatment
          </Button>
          <Button
            component={Link}
            to="/list"
            color="inherit"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Treatments List
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
