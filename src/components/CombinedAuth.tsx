import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type CombinedAuthProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const CombinedAuth: React.FC<CombinedAuthProps> = ({ setIsLoggedIn }) => {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Simulate API: Replace with real backend check if needed
  const checkEmail = async (email: string): Promise<boolean> => {
    setLoading(true);
    // For demo, treat "already@registered.com" as existing
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(email !== "already@registered.com");
      }, 700);
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!email) return;
    const isNew = await checkEmail(email);
    setIsNewUser(isNew);
    setStep("password");
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      let res, data;
      if (isNewUser) {
        // Register
        res = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        data = await res.json();
        if (data.data && data.data.success) {
          setMessage("Registration successful! 🎉");
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "1");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1200);
        } else {
          setMessage(data.data?.message || "Registration failed.");
        }
      } else {
        // Login
        res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        data = await res.json();
        if (data.data && data.data.success) {
          setMessage("Login successful! 🚀");
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "1");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1200);
        } else {
          setMessage(data.data?.message || "Login failed.");
        }
      }
    } catch {
      setMessage("Server error.");
    }
    setLoading(false);
  };

  const reset = () => {
    setStep("email");
    setEmail("");
    setPassword("");
    setName("");
    setIsNewUser(null);
    setMessage("");
  };

  return (
    <section className="py-12 flex flex-col items-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">Sign In / Register</h2>
      <form
        onSubmit={step === "email" ? handleEmailSubmit : handleAuthSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded shadow max-w-sm w-full"
      >
        {step === "email" && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mb-3 w-full px-3 py-2 border rounded"
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Checking..." : "Continue"}
            </button>
          </>
        )}

        {step === "password" && (
          <>
            {isNewUser && (
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="mb-3 w-full px-3 py-2 border rounded"
                disabled={loading}
              />
            )}
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
                ? isNewUser
                  ? "Registering..."
                  : "Logging in..."
                : isNewUser
                ? "Register"
                : "Login"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="w-full mt-2 text-blue-500 hover:underline text-sm"
            >
              &larr; Change email
            </button>
          </>
        )}

        {message && (
          <div className="mt-3 text-center text-blue-700 dark:text-blue-300">{message}</div>
        )}
      </form>
    </section>
  );
};

export default CombinedAuth;
