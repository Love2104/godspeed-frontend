import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: any;
  token: string;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>("");

  const login = async (data: { email: string; password: string }) => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.data && result.data.success) {
      setUser(result.data.user);
      setToken(result.data.token || "dummy-token");
      localStorage.setItem("user", JSON.stringify(result.data.user));
      localStorage.setItem("token", result.data.token || "dummy-token");
    } else {
      throw new Error(result.data?.message || "Login failed");
    }
  };

  const register = async (data: { name: string; email: string; password: string }) => {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.data && result.data.success) {
      // After successful registration, log in automatically:
      await login({ email: data.email, password: data.password });
    } else {
      throw new Error(result.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
