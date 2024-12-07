import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useApi = () => {
  // Initialize Axios instance
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // Optional: Set a timeout for requests
  });

  // Hook state
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to make API requests
  const fetchData = useCallback(async (endpoint, method = 'GET') => {
    setLoading(true);
    setError(null);

    console.log('ENDPOINT: ', endpoint);

    try {
      const response = await axiosInstance({
        url: endpoint,
        method
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchData };
};

export default useApi;