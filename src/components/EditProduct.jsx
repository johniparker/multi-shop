import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { FormProvider } from "../context/FormProvider";
import TextInput from "../components/common/TextInput";
import SubmitButton from "../components/common/SubmitButton";
import { Box, Typography, Container, Alert } from "@mui/material";

const EditProduct = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const { getProductById, updateProduct } = useApi();
  const navigate = useNavigate();
  const productId = useParams().productId;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);

        if (response && response.product) {
          setProduct(response.product);
        }
      } catch (err) {
        console.error('error fetching product: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value ? parseFloat(value) : 0, // Convert to number, default to 0 if empty
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleEditProduct = async (e) => {
    try {
      const updatedProduct = {
        ...product,
        price: typeof product.price === 'number' ? product.price : parseFloat(product.price)
      };
      const response = await updateProduct(productId, updatedProduct);
      if (!response) {
        setError("Invalid input");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Error during update:", err);
      setError("An error occurred. Please try again.");
    }
  };
  if (loading) {
    return <Typography>Loading...</Typography>
  }

  console.log('PRODUCT: ', product);
  console.log('PROD TITLE: ', product.title);
  console.log('PROD PRICE: ', product.price);
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
          Edit Product
        </Typography>
        <FormProvider onSubmit={handleEditProduct}>
          <TextInput
            label="Title"
            name="title"
            value={product.title || ""}
            onChange={handleInputChange}
            multiline
          />
          <TextInput
            label="Description"
            name="description"
            value={product.description || ""}
            onChange={handleInputChange}
            multiline
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
