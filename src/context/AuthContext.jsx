import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("green"); // 'green' | 'blue' | 'orange'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Apply theme color to root — affects all pages via CSS variables
    const root = document.documentElement;
    if (theme === "green") {
      root.style.setProperty("--primary-color", "#54BE96");
      root.style.setProperty("--primary-hover", "#3da87a");
      root.style.setProperty("--primary-shadow", "rgba(84, 190, 150, 0.4)");
      root.style.setProperty("--badge-purple", "#4535AF");
      root.style.setProperty("--badge-yellow", "#FBC75E");
    } else if (theme === "blue") {
      root.style.setProperty("--primary-color", "#3470FF");
      root.style.setProperty("--primary-hover", "#1f55e0");
      root.style.setProperty("--primary-shadow", "rgba(52, 112, 255, 0.4)");
      root.style.setProperty("--badge-purple", "#54BE96");
      root.style.setProperty("--badge-yellow", "#FBC75E");
    } else if (theme === "orange") {
      root.style.setProperty("--primary-color", "#FC832C");
      root.style.setProperty("--primary-hover", "#e06a12");
      root.style.setProperty("--primary-shadow", "rgba(252, 131, 44, 0.4)");
      root.style.setProperty("--badge-purple", "#54BE96");
      root.style.setProperty("--badge-yellow", "#FBC75E");
    }
  }, [theme]);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout, loading, theme, setTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
