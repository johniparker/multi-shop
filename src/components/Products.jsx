import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import useApi from "../hooks/useApi";
import Product from "./Product";

const Products = ({ productType }) => {
  const { getPublishedProducts } = useApi();

  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  console.log(productType);

  useEffect(() => {
    const fetchProducts = async () => {
      if (productType) {
        // Fetch filtered products
        const response = await getPublishedProducts({ search: productType });
        if (response && response.products) {
          setProducts(response.products);
          setGroupedProducts({});
        }
      } else {
        // Fetch and group products by product type
        const response = await getPublishedProducts({ groupBy: "product_type" });
        if (response && response.products) {
          setGroupedProducts(response.products); // Response is already grouped by type
          setProducts([]);
        }
      }
    };

    fetchProducts();
  }, [productType]);

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
