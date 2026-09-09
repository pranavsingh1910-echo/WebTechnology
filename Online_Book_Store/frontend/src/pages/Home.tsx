import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">WELCOME TO BOOKHUB</span>
        <h1>Discover your next great book.</h1>
        <p>
          Explore a collection of fiction, technology, self-help and academic
          books in one simple online store.
        </p>
        <Link to="/catalogue" className="primary-btn">Browse Catalogue</Link>
      </div>
    </section>
  );
}