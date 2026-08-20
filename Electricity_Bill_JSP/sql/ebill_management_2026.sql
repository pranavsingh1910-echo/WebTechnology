CREATE DATABASE ebill_management_2026;
USE ebill_management_2026;

CREATE TABLE ebill_consumers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consumer_number VARCHAR(30) NOT NULL UNIQUE,
    consumer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255)
);

CREATE TABLE ebill_monthly_bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consumer_number VARCHAR(30) NOT NULL,
    month_name VARCHAR(20) NOT NULL,
    bill_year INT NOT NULL,
    previous_reading INT NOT NULL,
    current_reading INT NOT NULL,
    units INT NOT NULL,
    bill_amount DECIMAL(10,2) NOT NULL,
    status ENUM('PAID','UNPAID') DEFAULT 'UNPAID',
    bill_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (consumer_number) REFERENCES ebill_consumers(consumer_number) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO ebill_consumers(consumer_number, consumer_name, email, phone)
VALUES ('EB001','Demo Consumer','demo@example.com','9999999999');

INSERT INTO ebill_monthly_bills
(consumer_number, month_name, bill_year, previous_reading, current_reading, units, bill_amount, status)
VALUES
('EB001','June',2026,1000,1150,150,575.00,'PAID'),
('EB001','July',2026,1150,1320,170,679.00,'PAID'),
('EB001','August',2026,1320,1520,200,835.00,'UNPAID');
