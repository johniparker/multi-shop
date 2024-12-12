import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import ProductPage from "../../pages/ProductPage";
import LoginPage from "../../pages/LoginPage";
import EditProduct from "../EditProduct";
import { CartProvider } from "../../context/CartContext";
import { Box } from "@mui/material";

const Layout = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [productType, setProductType] = useState("");

  // Function to toggle the visibility of the Navbar
  const toggleNavbar = () => {
    setIsNavbarVisible((prevState) => !prevState);
  };

  return (
    <CartProvider>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Header positioned at the top */}
        <Box sx={{ width: "100%" }}>
          <Header toggleNavbar={toggleNavbar} />
        </Box>

        {/* Side Navbar */}
        {isNavbarVisible && (
          <Box
            sx={{
              width: 240,
              bgcolor: "background.paper",
              boxShadow: 1,
              position: "fixed", // Fix the navbar to the left
              top: 64, // Align it below the header
              bottom: 0,
              overflowY: "auto",
            }}
          >
            <Navbar setProductType={setProductType} />
          </Box>
        )}

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: "64px", // Space for the fixed header
            marginLeft: isNavbarVisible ? "240px" : 0, // Adjust based on navbar visibility
            overflowY: "auto", // Allow scrolling for main content
            height: "calc(100vh - 64px)", // Full height minus header height
          }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/edit-product/:productId" element={<EditProduct />} />
            <Route
              path="/"
              element={<ProductPage productType={productType} />}
            />
          </Routes>
        </Box>
      </Box>
    </CartProvider>
  );
};

export default Layout;
