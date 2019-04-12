CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smoke Detector", "DRR", "2.50", "12091");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tarpaulins", "Shelter", "48.50", "8291");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blankets", "Shelter", "4.75", "3893");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ropes", "Shelter", "6.15", "8933");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jerry Cans", "WASH", "7.35", "1123");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soap", "WASH", "2.10", "3423");
