import React, { useState } from "react";

const Register: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Registration successful!");
        // Optionally redirect or log in the user
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch {
      setMessage("Server error.");
    }
  };

  return (
    <section className="py-12 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded shadow max-w-sm w-full">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="mb-3 w-full px-3 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-3 w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="mb-3 w-full px-3 py-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
          Register
        </button>
        {message && <div className="mt-3 text-center text-red-600">{message}</div>}
      </form>
    </section>
  );
};

export default Register;
