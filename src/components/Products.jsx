import React, { useEffect } from "react";
import useApi from "../hooks/useApi";

const Products = () => {
  const { data, error, loading, fetchData } = useApi();

  useEffect(() => {
    fetchData("/products/published");
  }, [fetchData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>API Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Products;
