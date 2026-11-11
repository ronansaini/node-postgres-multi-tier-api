const productService = require('../services/productService');

async function getProductsController(req, res, next) {
    try {
        const products = await productService.fetchProducts();
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
}

async function putProductController(req, res, next) {
    try {
        const productId = req.params.id;
        const name = req.body.product_name;
        const price = req.body.price;

        if (!name || !price) {
            const err = new Error('Missing parameters');
            err.statusCode = 400;
            throw err;
        }

        const updatedRows = await productService.modifyProduct(productId, name, price);
        res.status(200).json({ message: 'Updated!', product: updatedRows });
    } catch (err) {
        next(err);
    }
}

async function deleteProductController(req, res, next) {
    try {
        const productId = req.params.id;
        const deletedRows = await productService.removeProduct(productId);
        res.status(200).json({ message: 'Deleted!', product: deletedRows });
    } catch (err) {
        next(err);
    }
}

module.exports = { getProductsController, putProductController, deleteProductController };