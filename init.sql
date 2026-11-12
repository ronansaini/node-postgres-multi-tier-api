CREATE TABLE IF NOT EXISTS test_products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

INSERT INTO test_products (product_name, price) VALUES
    ('Wireless Mouse', 29.99),
    ('Mechanical Keyboard', 89.50),
    ('USB-C Hub', 45.00);
