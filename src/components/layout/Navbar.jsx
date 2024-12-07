import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'; // Import the useAuth hook
import { Drawer, List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout function from context

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" noWrap>
          Course
        </Typography>
      </Box>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        {user ? (
          <>
            <ListItem button component={Link} to="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to="/announcements">
              <ListItemText primary="Announcements" />
            </ListItem>
            <ListItem button component={Link} to="/pages">
              <ListItemText primary="Pages" />
            </ListItem>
            <ListItem button component={Link} to="/modules">
              <ListItemText primary="Modules" />
            </ListItem>
            <ListItem>
              <Button onClick={logout} color="primary" variant="outlined">
                Logout
              </Button>
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Navbar;