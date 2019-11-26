const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const config = require('../../config')

const User = require('../model/user')

router.post('/', (req, res) => {
    let login = req.body
    let token = jwt.sign(login, config.tokenDetail.secretKey)
    res
        .status(200)
        .json({
            token: token,
            message: "handling POST requests from /login"
        })

})

module.exports = router;