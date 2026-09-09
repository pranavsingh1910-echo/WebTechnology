import React from "react";
import { useEffect, useState } from "react";
import BookCard, { Book } from "../components/BookCard";
import { getBooks } from "../services/api";

import atomicHabits from "../images/atomic-habits.jpeg";
import cleanCode from "../images/clean-code.jpeg";
import alchemist from "../images/alchemist.jpeg";
import javaBook from "../images/java.jpeg";

export default function Catalogue() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks()
      .then(res => {
        const booksWithImages = res.data.map((book: Book) => {
          let image = "";

          if (book.title.toLowerCase().includes("atomic habits")) {
            image = atomicHabits;
          } else if (book.title.toLowerCase().includes("clean code")) {
            image = cleanCode;
          } else if (book.title.toLowerCase().includes("alchemist")) {
            image = alchemist;
          } else if (book.title.toLowerCase().includes("java")) {
            image = javaBook;
          }

          return {
            ...book,
            image
          };
        });

        setBooks(booksWithImages);
      })
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = books.filter(book =>
    `${book.title} ${book.author} ${book.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="catalogue">
      <div className="page-heading">
        <div>
          <span className="eyebrow">EXPLORE</span>
          <h1>Book Catalogue</h1>
        </div>

        <input
          className="search"
          placeholder="Search books..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : filtered.length === 0 ? (
        <p>No books found. Make sure MongoDB and Spring Boot are running.</p>
      ) : (
        <div className="book-grid">
          {filtered.map(book => (
            <BookCard
              key={book.id || book.title}
              book={book}
            />
          ))}
        </div>
      )}
    </section>
  );
}