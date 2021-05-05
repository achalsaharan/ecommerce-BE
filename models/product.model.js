const mongoose = require('mongoose');
require('mongoose-type-url');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:
                'Cannot enter a product without name, please enter product name',
        },

        price: {
            type: Number,
            required:
                'Cannot enter a product without price, please enter price of the product',
        },

        image: {
            type: mongoose.SchemaTypes.Url,
        },

        material: {
            type: String,
        },

        brand: {
            type: String,
        },

        inStock: {
            type: Boolean,
        },

        fastDelivery: {
            type: Boolean,
        },

        ratings: {
            type: Number,
        },

        discount: {
            type: Number,
        },

        offer: {
            type: String,
        },

        idealFor: {
            type: String,
        },

        level: {
            type: String,
        },

        color: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };
