require('dotenv').config();
const express = require('express');
const productController = require('./controllers/productController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mapping endpoint paths directly to presentation tier functions
app.get('/api/products', productController.getProductsController);
app.post('/api/products', productController.postProductController);
app.put('/api/products/:id', productController.putProductController);
app.delete('/api/products/:id', productController.deleteProductController);

// Global unified error catcher boundary
app.use(function (err, req, res, next) {
    console.error('💥 [Global Error Caught]:', err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: true,
        message: err.message || 'An unexpected database or application error occurred.'
    });
});

app.listen(PORT, function () {
    console.log('Multi-tier REST API v2 is live on Azure!' + PORT);
});