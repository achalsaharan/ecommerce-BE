require('dotenv').config();
const express = require('express');
const cors = require('cors');

//xx route handlers
const populateDB = require('./routes/populateDB.router');
const products = require('./routes/products.router');
const users = require('./routes/users.router');
const carts = require('./routes/carts.router');
const wishList = require('./routes/wishList.router');
const auth = require('./routes/auth.router');

const { initializeDBConnection } = require('./db/db.connect.js');
const routeNotFoundHandler = require('./middlewares/routeNotFoundHandler');
const allErrorsHandler = require('./middlewares/allErrorsHandler');

const PORT = 3999;

const app = express();
initializeDBConnection();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// routes
app.use('/populateDB', populateDB);
app.use('/products', products);
app.use('/users', users);
app.use('/carts', carts);
app.use('/wishlists', wishList);
app.use('/auth', auth);

// 404 route handler
app.use(routeNotFoundHandler);

// Error handler
app.use(allErrorsHandler);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
});
