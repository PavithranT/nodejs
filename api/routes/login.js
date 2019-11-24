const express = require('express')
const router = express.Router();

const User = require('../model/user')

router.post('/', (req, res) => {
    let login = req.body
    console.log(login)

    res
        .status(200)
        .json({
            message: "handling GET requests from /"
        })

})

module.exports = router;