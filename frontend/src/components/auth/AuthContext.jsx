import { createContext, useContext, useState } from "react";

// Create context for managing authentication state across the app
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize user state from local storage if available
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Handle user login and token storage
  const login = (username, token) => {
    console.log("Login called with:", { username, token });
    localStorage.setItem("authToken", token);
    setUser({ username });
  };

  // Clear user session and local storage
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
