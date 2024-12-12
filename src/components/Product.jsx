import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const Product = ({ product }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRedirect = (productId) => {
    navigate(`/edit-product/${productId}`)
  }

  return (
    <Card sx={{ margin: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || 'https://via.placeholder.com/300'} // Default image if none provided
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="subtitle1" color="primary" mt={1}>
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Type:</strong> {product.product_type}
        </Typography>
        <Typography variant="body2" color={product.inventory > 0 ? 'green' : 'red'} mt={1}>
          <strong>Inventory:</strong> {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
        </Typography>
        {product.published ? (
          <Typography variant="caption" color="text.secondary">
            Published
          </Typography>
        ) : (
          <Typography variant="caption" color="error">
            Unpublished
          </Typography>
        )}
        {user ? (<Button onClick={() => handleRedirect(product.id)}>Edit</Button>): (<></>)}
      </CardContent>
    </Card>
  );
};

export default Product;
