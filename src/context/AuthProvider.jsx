import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { getAdminSettings } = useApi();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setUser(loggedUser);
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (formData) => {
    setLoading(true);
    const { admin } = await getAdminSettings();
    console.log('ADMIN DATA: ', admin);

    console.log('USER: ', formData.username);
    console.log('USER: ', admin.username);
    console.log('PWD: ', formData.password);
    console.log('PWD: ', admin.password);
    if (formData.username === admin.username && formData.password === admin.password) {
      const user = admin
      setUser(user);
      setAuthenticated(true);
      localStorage.setItem("loggedUser", JSON.stringify(user));
      navigate("/");
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setAuthenticated(false);
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};