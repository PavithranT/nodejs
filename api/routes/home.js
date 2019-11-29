const express = require('express');
const router = express.Router();
const Product = require('../../database/db').product
const auth = require('../auth').extractToken
const { check, validationResult } = require('express-validator');

//import errors
const UserNotFoundError = require('../errors/UserNotFoundError')
const AuthorizationError = require('../errors/AuthorizationError')
const BadRequestError = require('../errors/BadRequestError')


router.get('/', async (req, res) => {
    try {
        // const users = await Product.count({ group: 'productCategoryId' })
        const users = await Product.findAll({
            attributes: ['Product.*', [sequelize.fn('count', 'Product.name',sequelize.col('ProductCount'))]]
        })
            .then(count => res.json(count))
            .catch(error => console.log("database errr ", error))
        res.status(200).send(users)
    } catch (error) {
        console.log("error sd", error)
        res.status(400).json(error)
    }
})

module.exports = router;