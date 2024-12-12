import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import useApi from "../hooks/useApi";
import Product from "./Product";

const Products = ({ productType, searchTerm }) => {
  const { getPublishedProducts } = useApi();
  const { user } = useAuth();
  console.log('USER: ', user);

  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const options = {};

      if (searchTerm) {
        options.search = searchTerm; // Apply search filter
      }
      else if (productType) {
        options.search = productType; // Apply product type filter
      }

      else {
        options.groupBy = "product_type";
      }

      const response = await getPublishedProducts(options);

      if (response && response.products) {
        if (productType || searchTerm) {
          setProducts(response.products); // Display the filtered products
          setGroupedProducts({});
        } else {
          setGroupedProducts(response.products); // Response is already grouped by type
          setProducts([]);
        }
      }
    };

    fetchProducts();
  }, [productType, searchTerm]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {productType ? productType : "Products"}
      </Typography>
      {Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([type, products]) => (
          <Box key={type} sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
              {/* Capitalize type */}
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
      ) : products.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No products found.
        </Typography>
      )}
    </Box>
  );
};

export default Products;
