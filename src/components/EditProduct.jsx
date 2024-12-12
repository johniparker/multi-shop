import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { FormProvider } from "../context/FormProvider";
import TextInput from "../components/common/TextInput";
import NumberInput from "./common/NumberInput";
import SelectInput from "./common/SelectInput";
import SubmitButton from "../components/common/SubmitButton";
import {
  Box,
  Typography,
  Container,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";

const EditProduct = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [productTypes, setProductTypes] = useState([]);
  const { getProductById, getProductTypes, updateProduct } = useApi();
  const navigate = useNavigate();
  const productId = useParams().productId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product by ID
        const productResponse = await getProductById(productId);
        if (productResponse && productResponse.product) {
          setProduct(productResponse.product);
        }

        // Fetch product types
        const types = await getProductTypes();
        if (types) {
          setProductTypes(types); // Store the unique product types
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
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

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: checked, // Update the 'published' field with the checked value (true/false)
    }));
  };
  

  const handleEditProduct = async (e) => {
    try {
      const updatedProduct = {
        ...product,
        price:
          typeof product.price === "number"
            ? product.price
            : parseFloat(product.price),
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
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ marginTop: 4, backgroundColor: "#121212" }}>
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
          <NumberInput
            label="Price"
            name="price"
            type="number"
            value={product.price || ""}
            onChange={handleInputChange}
          />
          <NumberInput
            label="Inventory"
            name="inventory"
            type="number"
            value={product.inventory || ""}
            onChange={handleInputChange}
          />
          <SelectInput
            label="Product Type"
            name="product_type"
            value={product.product_type || ""}
            options={productTypes}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={
              <Switch
                name="published"
                checked={product.published || false} // Make sure it's a boolean
                onChange={handleSwitchChange} // Handle the switch toggle
              />
            }
            label="Published"
            labelPlacement="start"
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
