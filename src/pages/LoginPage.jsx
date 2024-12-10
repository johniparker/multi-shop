import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import { FormProvider } from "../context/FormProvider";
import TextInput from "../components/common/TextInput";
import PasswordInput from "../components/common/PasswordInput";
import SubmitButton from "../components/common/SubmitButton";
import { Box, Typography, Container, Alert } from "@mui/material";

const LoginPage = () => {
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleLogin = async (formData) => {
      try {
        // Call the login function from the context
        const success = await login(formData);
  
        if (!success) {
          setError("Invalid username or password");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Error during login:", err);
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
            color: "#FFFFFF" 
          }}>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>
          <FormProvider onSubmit={handleLogin}>
            <TextInput 
              label="Username" 
              name="username" 
              required 
              inputProps={{ style: { backgroundColor: "#2C2C2C", color: "#FFFFFF" } }} // Input styling
            />
            <PasswordInput 
              label="Password" 
              name="password" 
              required 
              inputProps={{ style: { backgroundColor: "#2C2C2C", color: "#FFFFFF" } }} // Input styling
            />
            {error && (
              <Alert severity="error" sx={{ marginTop: 2, backgroundColor: "#D32F2F", color: "#FFFFFF" }}>
                {error}
              </Alert>
            )}
            <SubmitButton label="Login" />
          </FormProvider>
        </Box>
      </Container>
    );
  };
  
  export default LoginPage;