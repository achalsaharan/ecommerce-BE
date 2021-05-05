const express = require('express');
const router = express.Router();
const { Product } = require('../models/product.model');

//~desc
// GET /products -> gets all products
//GET /products/:productId -> gets product with product id

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.json({ success: true, products: products });
});

router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        res.json(product);
    } catch (error) {
        console.log('error occoured', error);
        res.status(404).json({
            success: false,
            message: 'product not found',
            error: error.message,
        });
    }
});

module.exports = router;
