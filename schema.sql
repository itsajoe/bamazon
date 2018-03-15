CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NULL,
    price INT NOT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Backpack", "Outdoors", 35, 10), 
("Hair Gel", "Personal", 26, 16),
("Hairbrush", "Personal", 20, 5),
("Toothbrush", "Personal", 5, 25),
("Camelback", "Outdoors", 85, 4),
("The Greatest Showman", "Entertainment", 25, 20),
("Pitch Perfect", "Entertainment", 15, 30),
("The Hobbit", "Books", 25, 10),
("The Lord of The Rings", "books", 19, 13),
("Water Purifier", "Outdoors", 95, 11);