import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type CombinedAuthProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const CombinedAuth: React.FC<CombinedAuthProps> = ({ setIsLoggedIn }) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      let res, data;
      if (mode === "register") {
        res = await fetch("https://godspeed-backend-dncc.onrender.com/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        data = await res.json();
        if (data && data.success) {
          setMessage("Registration successful! 🎉");
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "1");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1200);
        } else {
          setMessage(data?.message || "Registration failed.");
        }
      } else {
        res = await fetch("https://godspeed-backend-dncc.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        data = await res.json();
        if (data && data.success) {
      
          setMessage("Login successful! 🚀");
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "1");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1200);
        } else {
         
          setMessage(data?.message || "Login failed.");
        }
      }
    } catch {
      setMessage("Server error.");
    }
    setLoading(false);
  };

  return (
    <section className="py-12 flex flex-col items-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">Sign In / Register</h2>
      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${mode === "login" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("login")}
          disabled={loading}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "register" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("register")}
          disabled={loading}
        >
          Register
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded shadow max-w-sm w-full"
      >
        {mode === "register" && (
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="mb-3 w-full px-3 py-2 border rounded"
            disabled={loading}
            autoFocus
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="mb-3 w-full px-3 py-2 border rounded"
          disabled={loading}
          autoFocus={mode === "login"}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="mb-3 w-full px-3 py-2 border rounded"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading
            ? mode === "register"
              ? "Registering..."
              : "Logging in..."
            : mode === "register"
            ? "Register"
            : "Login"}
        </button>
        {message && (
          <div className="mt-3 text-center text-blue-700 dark:text-blue-300">{message}</div>
        )}
      </form>
    </section>
  );
};

export default CombinedAuth;
