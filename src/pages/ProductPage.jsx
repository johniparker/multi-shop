import { useState } from 'react';
import { Box } from "@mui/material";
import Products from "../components/Products";
import SearchBar from "../components/SearchBar";
import Cart from "../components/Cart";

const ProductPage = ({ productType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  console.log("ProductType:", productType);
  return (
    <Box>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Products productType={productType} searchTerm={searchTerm} />
      <Cart />
    </Box>
  );
};

export default ProductPage;
