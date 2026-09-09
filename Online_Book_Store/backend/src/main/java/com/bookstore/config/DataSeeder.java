package com.bookstore.config;

import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedBooks(BookRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(book("Atomic Habits", "James Clear", 499, "Self Help",
                        "A practical guide to building good habits.",
                        "https://placehold.co/300x420?text=Atomic+Habits"));

                repository.save(book("Clean Code", "Robert C. Martin", 699, "Programming",
                        "A handbook of agile software craftsmanship.",
                        "https://placehold.co/300x420?text=Clean+Code"));

                repository.save(book("The Alchemist", "Paulo Coelho", 299, "Fiction",
                        "A classic story about following your dreams.",
                        "https://placehold.co/300x420?text=The+Alchemist"));

                repository.save(book("Java: The Complete Reference", "Herbert Schildt", 899, "Programming",
                        "A comprehensive reference for Java programming.",
                        "https://placehold.co/300x420?text=Java"));
            }
        };
    }

    private Book book(String title, String author, double price, String category,
                      String description, String imageUrl) {
        Book b = new Book();
        b.setTitle(title);
        b.setAuthor(author);
        b.setPrice(price);
        b.setCategory(category);
        b.setDescription(description);
        b.setImageUrl(imageUrl);
        return b;
    }
}