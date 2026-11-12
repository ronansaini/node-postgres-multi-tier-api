const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function getAllProducts() {
    const queryText = 'SELECT * FROM test_products ORDER BY id ASC;';
    const result = await pool.query(queryText);
    return result.rows;
}
async function createProduct(name, price) {
    const queryText = 'INSERT INTO test_products (product_name, price) VALUES ($1, $2) RETURNING *;';
    const result = await pool.query(queryText, [name, price]);
    return result.rows[0];
}

async function updateProduct(id, name, price) {
    const queryText = 'UPDATE test_products SET product_name = $1, price = $2 WHERE id = $3 RETURNING *;';
    const result = await pool.query(queryText, [name, price, id]);
    return result;
}

async function deleteProduct(id) {
    const queryText = 'DELETE FROM test_products WHERE id = $1 RETURNING *;';
    const result = await pool.query(queryText, [id]);
    return result;
}

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };