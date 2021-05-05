const express = require('express');
const { Product } = require('../models/product.model');
const faker = require('faker');
const router = express.Router();

router.get('/', async (req, res) => {
    for (let i = 0; i < 10; i++) {
        const prod = {
            name: faker.commerce.productName(),
            image: faker.random.image(),
            price: faker.commerce.price(),
            material: faker.commerce.productMaterial(),
            brand: faker.lorem.word(),
            inStock: faker.datatype.boolean(),
            fastDelivery: faker.datatype.boolean(),
            inWishList: false,
            ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
            discount: faker.random.arrayElement([0, 5, 15, 30]),
            offer: faker.random.arrayElement([
                'Save 50',
                '70% bonanza',
                'Republic Day Sale',
            ]),
            idealFor: faker.random.arrayElement([
                'Men',
                'Women',
                'Girl',
                'Boy',
                'Senior',
            ]),
            level: faker.random.arrayElement([
                'beginner',
                'amateur',
                'intermediate',
                'advanced',
                'professional',
            ]),
            color: faker.commerce.color(),
        };

        const NewProduct = new Product(prod);
        await NewProduct.save();
    }
    const products = await Product.find({});
    res.json(products);
});

module.exports = router;
