import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setProductType }) => {
  const { getPublishedProducts, error } = useApi();
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndExtractProductTypes = async () => {
      const response = await getPublishedProducts();
      if (response && response.products) {
        // Extract unique product types from the response
        const types = Array.from(
          new Set(response.products.map((product) => product.product_type))
        );
        setProductTypes(types); // Update state with fetched product types
      }
    };

    fetchAndExtractProductTypes();
  }, []);

  const handleProductTypeClick = (type) => {
    setProductType(type); // Update filter in parent component
    setSelectedType(type); // Track the selected product type
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      {location.pathname === "/" ? (
        <List>
          <ListItem>
            <ListItemText primary="Filter by Product Type" />
          </ListItem>
          <ListItem
            button
            selected={selectedType === ""}
            onClick={() => handleProductTypeClick("")}
          >
            <ListItemText primary="All Products" />
          </ListItem>
          {error ? (
            <Typography color="error" sx={{ padding: 2 }}>
              Error loading filters
            </Typography>
          ) : (
            productTypes.map((type) => (
              <ListItem
                button
                key={type}
                selected={type === selectedType}
                onClick={() => handleProductTypeClick(type)} // Set the product type filter
              >
                <ListItemText
                  primary={type.charAt(0).toUpperCase() + type.slice(1)}
                />
              </ListItem>
            ))
          )}
        </List>
      ) : (
        <List>
          <ListItem>
            <ListItemText primary="Filter by Product Type" />
          </ListItem>
          <ListItem
            button
            selected={selectedType === ""}
            onClick={handleRedirect}
          >
            <ListItemText primary="View Products" />
          </ListItem>
        </List>
      )}
    </Drawer>
  );
};

export default Navbar;
