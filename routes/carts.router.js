const express = require('express');
const { extend, update } = require('lodash');
const router = express.Router();
const { Cart } = require('../models/cart.model');

router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find({});
        res.json(carts);
    } catch (error) {
        console.log('error occoured', error);
        res.json({ error: error.message });
    }
});

router.get('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        let cart = await Cart.findOne({ _id: cartId }).populate(
            'products.productId'
        );

        const products = cart.products.map((product) => {
            return {
                ...product.productId.toObject(),
                quantity: product.quantity,
            };
        });

        res.json({ success: true, products: products });
    } catch (error) {
        console.log('error occoured', error);
        res.json({ error: error.message });
    }
});

//~desc to add/update a product in the cart, will return the product
//request body = {_id: "something something", quantity: 1}
router.post('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const newProduct = req.body;
        let cart = await Cart.findById(cartId);

        const isPresent =
            cart.products.find(
                (product) => product.productId.toString() === newProduct._id
            ) !== undefined
                ? true
                : false;

        if (isPresent) {
            const products = cart.products.map((product) =>
                product.productId.toString() === newProduct._id
                    ? {
                          _id: product._id,
                          productId: product.productId,
                          quantity: newProduct.quantity,
                      }
                    : product
            );
            cart.products = products;

            await cart.save();

            //getting the populated cart
            cart = await Cart.findById(cartId).populate('products.productId');

            let updatedProduct;
            cart.products.forEach((product) => {
                if (product.productId._id.toString() === newProduct._id) {
                    updatedProduct = {
                        ...product.productId.toObject(),
                        quantity: product.quantity,
                    };
                }
            });

            res.status(201).json({ success: true, product: updatedProduct });
        } else {
            cart.products.push({
                productId: newProduct._id,
                quantity: 1,
            });
            await cart.save();

            //getting the populated cart
            cart = await Cart.findById(cartId).populate('products.productId');

            let updatedProduct;
            cart.products.forEach((product) => {
                if (product.productId._id.toString() === newProduct._id) {
                    updatedProduct = {
                        ...product.productId.toObject(),
                        quantity: product.quantity,
                    };
                }
            });

            res.status(201).json({ success: true, product: updatedProduct });
        }
    } catch (error) {
        console.log('error occoured', error);
        res.json({ error: error });
    }
});

router.delete('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const prod = req.body;

        let cart = await Cart.findById(cartId);

        cart.products = cart.products.filter(
            (product) => product.productId.toString() !== prod._id
        );

        await cart.save();

        res.status(204).json({ success: true });
    } catch (error) {
        console.log('error occoured', error);
        res.json({ success: false, error: error });
    }
});

module.exports = router;
