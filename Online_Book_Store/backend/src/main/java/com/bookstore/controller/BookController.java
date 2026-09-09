package com.bookstore.controller;

import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookRepository repository;

    public BookController(BookRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Book> getBooks() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return repository.save(book);
    }
}