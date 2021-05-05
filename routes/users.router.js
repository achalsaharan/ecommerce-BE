const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { Cart } = require('../models/cart.model');
const { WishList } = require('../models/wishList.model');
const mongoose = require('mongoose');
const { extend } = require('lodash');

router.post('/', async (req, res) => {
    try {
        //making user
        let newUser = req.body;

        newUser = extend(newUser, { _id: new mongoose.Types.ObjectId() });
        //making cart
        let newCart = {
            _id: new mongoose.Types.ObjectId(),
            products: [],
            user: newUser._id,
        };

        let newWishList = {
            _id: new mongoose.Types.ObjectId(),
            products: [],
            user: newUser._id,
        };

        //extending the newUser with cart and wishlist Id
        newUser = extend(newUser, {
            wishList: newWishList._id,
            cart: newCart._id,
        });

        //making user and cart
        const NewUser = new User(newUser);
        const NewCart = new Cart(newCart);
        const NewWishList = new WishList(newWishList);

        //saving user, cart and wishlist
        const savedUser = await NewUser.save();
        const savedCart = await NewCart.save();
        const savedWishList = await NewWishList.save();

        res.json({ success: true, savedUser, savedCart, savedWishList });
    } catch (error) {
        console.log('error occoured', error);
        res.json({ message: 'can not create user', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.json({ message: 'can not get users' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        console.log('error occoured: ', error.message);
        res.status(404).json({
            success: false,
            message: 'user not found',
            error: error.message,
        });
    }
});

module.exports = router;
