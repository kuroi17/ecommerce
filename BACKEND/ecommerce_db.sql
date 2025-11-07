CREATE DATABASE ecommerce_db; -- create database named ecommerce_db

USE ecommerce_db; -- use the created database
    
-- create table of orders with id as primary key 
--auto increment and created at timestamp current
-- cart as JSON to store cart data

CREATE TABLE orders(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    cart JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);