import { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { Drawer, List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';

const Navbar = ({ setProductType }) => {
  const { getPublishedProducts, error } = useApi();
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchAndExtractProductTypes = async () => {
      const response = await getPublishedProducts();
      if (response && response.products) {
        // Extract unique product types from the response
        const types = Array.from(new Set(response.products.map((product) => product.product_type)));
        setProductTypes(types); // Update state with fetched product types
      }
    };

    fetchAndExtractProductTypes();
  }, []);

  const handleProductTypeClick = (type) => {
    setProductType(type); // Update filter in parent component
    setSelectedType(type); // Track the selected product type
  };

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
      {/* <Box sx={{ padding: 2 }}>
        <Typography variant="h6" noWrap>
          Course
        </Typography>
        {user && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Welcome, {user.name}</Typography>
            <Button onClick={logout} variant="contained" sx={{ mt: 1 }}>
              Logout
            </Button>
          </Box>
        )}
      </Box> */}
      <List>
        <ListItem>
          <ListItemText primary="Filter by Product Type" />
        </ListItem>
        <ListItem 
          button
          selected={selectedType === ''} 
          onClick={() => handleProductTypeClick('')}>
          <ListItemText primary="All Products" />
        </ListItem>
        {/* Render product types */}
        {error ? (
          <Typography color="error" sx={{ padding: 2 }}>
            Error loading filters
          </Typography>
        ) : (
          productTypes.map((type) => (
            <ListItem
              button
              key={type}
              selected={type === selectedType}
              onClick={() => handleProductTypeClick(type)} // Set the product type filter
            >
              <ListItemText primary={type.charAt(0).toUpperCase() + type.slice(1)} />
            </ListItem>
          ))
        )}
        
      </List>
    </Drawer>
  );
};

export default Navbar;