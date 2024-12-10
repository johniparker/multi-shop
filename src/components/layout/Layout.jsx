import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import ProductPage from "../../pages/ProductPage";
import SearchBar from "../SearchBar";

const Layout = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [productType, setProductType] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  // Function to toggle the visibility of the Navbar
  const toggleNavbar = () => {
    setIsNavbarVisible((prevState) => !prevState);
  };

  return (
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
        <SearchBar setSearchTerm={setSearchTerm} />
        <ProductPage productType={productType} searchTerm={searchTerm} />
      </Box>
    </Box>
  );
};

export default Layout;
