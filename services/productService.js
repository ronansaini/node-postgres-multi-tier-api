const productRepository = require('../repositories/productRepository');

async function fetchProducts() {
    return await productRepository.getAllProducts();
}

async function modifyProduct(id, name, price) {
    if (price <= 0) {
        const customErr = new Error('Price must be greater than zero.');
        customErr.statusCode = 400;
        throw customErr;
    }
    
    const result = await productRepository.updateProduct(id, name, price);
    
    if (result.rowCount === 0) {
        const missingErr = new Error('Product not found');
        missingErr.statusCode = 404;
        throw missingErr;
    }
    return result.rows;
}

async function removeProduct(id) {
    const result = await productRepository.deleteProduct(id);
    
    if (result.rowCount === 0) {
        const missingErr = new Error('Product not found');
        missingErr.statusCode = 404;
        throw missingErr;
    }
    return result.rows;
}

module.exports = { fetchProducts, modifyProduct, removeProduct };