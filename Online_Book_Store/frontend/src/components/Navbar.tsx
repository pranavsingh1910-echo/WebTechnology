import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">📚 BookHub</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/catalogue">Catalogue</Link>
        <Link to="/login">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div>
    </nav>
  );
}