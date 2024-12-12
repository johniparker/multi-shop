import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { FormProvider } from "../context/FormProvider";
import TextInput from "../components/common/TextInput";
import SubmitButton from "../components/common/SubmitButton";
import { Box, Typography, Container, Alert } from "@mui/material";

const EditProduct = () => {
  const [error, setError] = useState("");
  const [product, setProduct] = useState({});
  const { getProductById, updateProduct } = useApi();
  const navigate = useNavigate();
  const productId = useParams().productId;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(productId);

      if (response && response.product) {
        setProduct(response.product);
      } else {
        setProduct({});
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditProduct = async (e) => {

    try {
      const updatedProduct = await updateProduct(productId, product);
      console.log('UPDATED PRODUCT: ', updatedProduct)
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
          {product && product.title ? product.title : "Edit Product"}
        </Typography>
        <FormProvider onSubmit={handleEditProduct}>
          <TextInput
            label="Title"
            name="title"
            value={product.title || ""}
            onChange={handleInputChange}
          />
          <TextInput
            label="Description"
            name="description"
            value={product.description || ""}
            onChange={handleInputChange}
          />
          <TextInput
            label="Price"
            name="price"
            type="number"
            value={product.price || ""}
            onChange={handleInputChange}
          />
          {error && (
            <Alert
              severity="error"
              sx={{
                marginTop: 2,
                backgroundColor: "#D32F2F",
                color: "#FFFFFF",
              }}
            >
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
