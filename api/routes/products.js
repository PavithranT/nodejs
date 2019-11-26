const express = require('express')
const router = express.Router();
// const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const Product = require('../model/product');
const auth = require('../auth').extractToken

const config = require('../../config')

router.get('/',auth, (req,  res) => {

    try {
        res.status(200).json({
            message: "Handling GET requests to /products",
        });
    } catch (error) {
        console.log("error in GET product", error)
    }

});

router.post('/',auth, (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.put('/product', (req, res) => {
    // console.log(req.body)
    // let productId = 54
    let product = req.body
    Product
        .findOneAndUpdate({ productId: product.productId }, product)
        // .update({ productId: productId }, { $set: product })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Update is done successfully",
                // createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

})

router.delete('/:productId', (req, res) => {
    const productId = req.params.productId;
    //Product.remove({ _id: id })
    Product.deleteOne({ productId: productId })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.get('/:productId', (req, res) => {
    const productId = req.params.productId;
    // const price = 33000
    // const name = 'OnePlus7'

    Product.find().byProductId(productId) //find({ productId: productId })
        .exec()
        .then(record => {
            //console.log("From database", record);
            if (record) {
                res.status(200).json(record);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
})

router.post('/product', (req, res) => {
    let obj = req.body
    console.log(Object.keys(obj))


    res
        .status(200)
        .json({
            message: `handling POST  requests from /products/product`
        })

})


module.exports = router;