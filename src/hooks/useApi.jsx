import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const useApi = () => {
  const [error, setError] = useState(null);

  // Helper function to handle API errors
  const handleError = (err) => {
    setError(err.response?.data?.message || err.message);
  };

  // Get all published products
  const getPublishedProducts = async (options = {}) => {
    try {
      const { groupBy, search } = options;
      const params = new URLSearchParams();
      if (groupBy) params.append('groupBy', groupBy);
      if (search) params.append('search', search);

      const response = await axios.get(`${BASE_URL}/products/published?${params}`);
      return response.data;
    } catch (err) {
      handleError(err);
    }
  };

  const getProductTypes = async () => {
    try {
      const response = await getPublishedProducts();
      if (response && response.products) {
        // Extract unique product types from the response
        const types = Array.from(
          new Set(response.products.map((product) => product.product_type))
        );
        return types;
      }
    } catch (err) {
      handleError(err);
    }
  };

  // Get all products
  const getAllProducts = async (options = {}) => {
    try {
      const { groupBy, search } = options;
      const params = new URLSearchParams();
      if (groupBy) params.append('groupBy', groupBy);
      if (search) params.append('search', search);

      const response = await axios.get(`${BASE_URL}/products/all?${params}`);
      return response.data;
    } catch (err) {
      handleError(err);
    }
  };

  const getProductById = async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${productId}`);
      return response.data;
    } catch (err) {
      handleError(err);
    }
  };

  // Update a specific product
  const updateProduct = async (productId, productData) => {
    try {
      const response = await axios.put(`${BASE_URL}/products/${productId}`, {
        product: productData,
      });
      return response.data;
    } catch (err) {
      handleError(err);
    }
  };

  // Get admin settings
  const getAdminSettings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin`);
      return response.data;
    } catch (err) {
      handleError(err);
    }
  };

  // Update admin settings
  const updateAdminSettings = async (adminData) => {
    try {
      const response = await axios.put(`${BASE_URL}/admin`, {
        admin: adminData,
      });
      return response.data;
    } catch (err) {
      handleError(err);
    }
  };

  return {
    getPublishedProducts,
    getAllProducts,
    getProductTypes,
    getProductById,
    updateProduct,
    getAdminSettings,
    updateAdminSettings,
    error, // Expose error state
  };
};

export default useApi;
