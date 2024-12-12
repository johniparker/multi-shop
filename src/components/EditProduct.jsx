import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { FormProvider } from "../context/FormProvider";
import TextInput from "../components/common/TextInput";
import SubmitButton from "../components/common/SubmitButton";
import { Box, Typography, Container, Alert } from "@mui/material";

const EditProduct = () => {
  const [error, setError] = useState("");
  const { getProductById, updateProduct } = useApi();
  const navigate = useNavigate();
  const productId = useParams().productId;
  console.log('PRODUCT ID: ', productId);

  const fetchProduct = async () => {
    const fetchedProduct = getProductById(productId);
    console.log('FETCHED PROD: ', fetchedProduct)
    return fetchedProduct;
  }

  const product = fetchProduct();

  console.log("PRODUCT: ", product);


  const handleEditProduct = async (formData) => {
    const newProduct = formData;

    try {
      const updatedProduct = await updateProduct(productId, newProduct);

      if (!updatedProduct) {
        setError("Invalid input");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Error during update:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4, backgroundColor: "#121212" }}>
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          {product && product.title ? product.title : "Product"}
        </Typography>
        <FormProvider onSubmit={handleEditProduct}>
          <TextInput />
          {error && (
              <Alert severity="error" sx={{ marginTop: 2, backgroundColor: "#D32F2F", color: "#FFFFFF" }}>
                {error}
              </Alert>
            )}
          <SubmitButton label="Submit Edits" />
        </FormProvider>
      </Box>
    </Container>
  );
};

export default EditProduct;