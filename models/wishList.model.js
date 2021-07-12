const mongoose = require('mongoose');

const WishListSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
});

const WishList = mongoose.model('Wishlist', WishListSchema);

module.exports = { WishList };
