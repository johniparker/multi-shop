import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setUser(loggedUser);
      setAuthenticated(true);
    } else if (
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/"
    ) {
      navigate("/login");
    }
    setLoading(false);
  }, []);

  const login = async (formData) => {
    setLoading(true);
    console.log('USER: ', formData.username)
    const user = await usersApi.getByField("username", formData.username);
    console.log("Fetched user:", user);
    if (user && user.password === formData.password) {
      console.log("Logging in user:", user);
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

  const register = async (newUser) => {
    setLoading(true);

    if (newUser.password !== newUser.confirmPassword) {
      setLoading(false);
      return { success: false, error: "passwords do not match" };
    }

    const existingUser = await usersApi.getByField("username", newUser.username);
    if (existingUser) {
      setLoading(false);
      return { success: false, error: "username already exists" };
    }

    const createdUserId = await usersApi.create(newUser);
    const createdUser = await usersApi.getByField("id", createdUserId);

    console.log(createdUser)
    if (createdUser) {
      setUser(createdUser);
      setAuthenticated(true);
      localStorage.setItem("loggedUser", JSON.stringify(createdUser));
      navigate("/");
      setLoading(false);
      return { success: true };
    }

    setLoading(false);
    return { success: false, error: "registration failed" };
  };

  const logout = () => {
    setUser(null);
    setAuthenticated(false);
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  const updateUser = async (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    await usersApi.update(updatedUser.id, updatedUser);
    setUser(updatedUser);
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateUser, loading }}
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