import React from "react";

export interface Book {
  id?: string;
  title: string;
  author: string;
  price: number;
  category: string;
  image?: string;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="book-card">
      <div className="book-image">
        {book.image ? (
          <img src={book.image} alt={book.title} />
        ) : (
          <div className="book-placeholder">{book.title}</div>
        )}
      </div>

      <div className="book-info">
        <span className="book-category">{book.category}</span>

        <h3>{book.title}</h3>

        <p className="book-author">by {book.author}</p>

        <div className="book-bottom">
          <strong>₹{book.price}</strong>
          <button>View</button>
        </div>
      </div>
    </article>
  );
}