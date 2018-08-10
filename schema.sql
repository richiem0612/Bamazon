-- Drops the database if it exists currently --
DROP DATABASE IF EXISTS bamazon;

-- Creates the database --
CREATE DATABASE bamazon;

-- Use database for the following statements --
USE bamazon;

-- Creates the table "products" within the bamazon database --
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NULL,
	department_name VARCHAR(100) NULL,
	price DECIMAL(10,2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV Stick", "Electronics", 29.99, 100), ("Google Home Mini", "Electronics", 39.99, 120), 
("Wireless Headphones", "Electronics", 99.99, 40), ("Socks", "Apparel", 9.99, 40), 
("Jacket", "Apparel", 49.99, 50), ("Sneakers", "Apparel", 79.99, 20), 
("Picture Frame", "Home", 19.99, 60), ("Center Rug", "Home", 89.99, 20), 
("Recipe Book", "Books", 14.99, 30), ("Children Book", "Books", 9.99, 30);

SELECT * FROM products;