import { Box } from "@mui/material";
import Products from "../components/Products";

const ProductPage = ({ productType, searchTerm }) => {
  console.log("ProductType:", productType);
  console.log('searchterm: ', searchTerm);
  return (
    <Box>
      <Products productType={productType} searchTerm={searchTerm} />
    </Box>
  );
};

export default ProductPage;
