import React from "react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await registerUser({ name, email, password });
      setMessage("Registration successful!");
      setTimeout(() => navigate("/login"), 700);
    } catch {
      setMessage("Registration failed. Check the backend and try again.");
    }
  };

  return (
    <section className="form-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Register to use the online book store.</p>

        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

        <label>Confirm Password</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />

        <button className="primary-btn" type="submit">Register</button>
        {message && <div className="message">{message}</div>}

        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}