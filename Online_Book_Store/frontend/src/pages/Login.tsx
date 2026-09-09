import React from "react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      setMessage("Login successful!");
      setTimeout(() => navigate("/catalogue"), 500);
    } catch {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <section className="form-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Welcome back to BookHub.</p>

        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

        <button className="primary-btn" type="submit">Login</button>
        {message && <div className="message">{message}</div>}

        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </section>
  );
}