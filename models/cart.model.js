const mongoose = require('mongoose');

const CartSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: Number,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart };
