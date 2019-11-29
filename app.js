const express = require('express');
const app = express();
const morgan = require('morgan')
const db = require('./database/db')


const URLInvalidError = require('./api/errors/URLInvalidError')

app.use(morgan('dev'))
const signupRoutes = require('./api/routes/signup');
const homeRoutes = require('./api/routes/home');
const signoutRoutes = require('./api/routes/signout');
const producCategorytRoutes = require('./api/routes/productCategory');
const productRoutes = require('./api/routes/products');
const loginRoutes = require('./api/routes/login');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Routes which handles requests
app.use('/signup', signupRoutes);
app.use('/signout', signoutRoutes);
app.use('/login', loginRoutes);
app.use('/products', productRoutes);
app.use('/productscategory', producCategorytRoutes);
app.use('/home', homeRoutes);


//if URL is not matched
app.use((req, res, next) => {
    let error = new URLInvalidError();
    res.status(error.status).json({ message: error.message })
    next();
})


module.exports = app;