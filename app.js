const express = require('express');
const app = express();
const morgan = require('morgan')
// const mongoose = require('mongoose')

// const auth = require('./api/auth').extractToken

app.use(morgan('dev'))

const productRoutes = require('./api/routes/products');
const loginRoutes = require('./api/routes/login')
const bodyParser = require('body-parser');


// mongoose.connect(`mongodb+srv://pavithran96:${process.env.MONGO_ATLAS_PW}@node-restapi-wtldq.mongodb.net/test?retryWrites=true&w=majority`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS Handling code
// app.use((req, res) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', '*')
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'DELETE', 'GET')
//         return res.status(200).json({});
//     }
// })

//Routes which handles requests
app.use('/login', loginRoutes);
app.use('/products', productRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({ message: "Invalid URL, Please check and try again..." })
    next(error)
})

app.use((error, req, res) => {
    res
        .status(error.status || 500)
        .json({
            message: error.message
        })

})


module.exports = app;