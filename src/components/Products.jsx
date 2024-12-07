import React, { useEffect } from 'react';
import { Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import useApi from '../hooks/useApi';
import Product from './Product';

const Products = () => {
  const { data, error, loading, fetchData } = useApi();

  useEffect(() => {
    fetchData('/products/published'); // Adjust the endpoint to match your API
  }, [fetchData]);

  // Group products by product_type
  const groupByProductType = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.product_type]) {
        acc[product.product_type] = [];
      }
      acc[product.product_type].push(product);
      return acc;
    }, {});
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error: {error.message}
      </Alert>
    );
  }

  const groupedProducts = data && data.products ? groupByProductType(data.products) : {};

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>
      {Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([type, products]) => (
          <Box key={type} sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize type */}
            </Typography>
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No products found.
        </Typography>
      )}
    </Box>
  );
};

export default Products;
