const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: "Can't create user without first name",
        },

        lastName: {
            type: String,
        },

        email: {
            type: String,
            unique: 'Email already in use',
            required: "Can't create user without email",
        },

        password: {
            type: String,
            require: "Can't create user without password",
        },

        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
        },

        wishList: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WishList',
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
