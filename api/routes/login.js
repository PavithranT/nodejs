const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const config = require('../../config')

const User = require('../model/user')

router.post('/', (req, res) => {
    let login = req.body
    console.log(config.tokenDetail)
    let token = jwt.sign(login, config.tokenDetail.secretKey, { expiresIn: config.tokenDetail.expiresIn })
    res
        .status(200)
        .json({
            token: token,
            message: "handling POST requests from /login"
        })

})

module.exports = router;