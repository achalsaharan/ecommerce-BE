const express = require('express');
const router = express.Router();
const { WishList } = require('../models/wishList.model');

router.get('/', async (req, res) => {
    let wishLists = await WishList.find({}).populate('products');
    res.json(wishLists);
});

router.get('/:wishListId', async (req, res) => {
    try {
        const { wishListId } = req.params;
        const wishList = await WishList.findById(wishListId).populate(
            'products'
        );

        res.status(200).json({ success: true, products: wishList.products });
    } catch (error) {
        console.log('error occoured', error);
        res.json({ success: false, error: error });
    }
});

router.post('/:wishListId', async (req, res) => {
    const { wishListId } = req.params;
    const newProduct = req.body;
    const wishList = await WishList.findById(wishListId);

    const isAlreadyPresent =
        wishList.products.find(
            (product) => product._id.toString() === newProduct._id
        ) === undefined
            ? false
            : true;

    if (isAlreadyPresent) {
        res.json({ wishList, isAlreadyPresent });
    } else {
        wishList.products.push(newProduct._id);
        await wishList.save();

        let updatedWishList = await WishList.findById(wishList).populate(
            'products'
        );
        let updatedProduct;

        updatedWishList.products.forEach((product) => {
            if (product._id.toString() === newProduct._id) {
                updatedProduct = { ...product.toObject() };
            }
        });

        res.status(201).json({ success: true, product: updatedProduct });
    }
});

router.delete('/:wishListId', async (req, res) => {
    try {
        const { wishListId } = req.params;
        const delProduct = req.body;

        const wishList = await WishList.findById(wishListId);

        // console.log(wishList);

        wishList.products = wishList.products.filter(
            (product) => product.toString() !== delProduct._id
        );

        await wishList.save();
        res.status(201).json(wishList);
    } catch (error) {
        console.log('error occoured', error);
        res.json({ success: false, error: error });
    }
});

module.exports = router;
