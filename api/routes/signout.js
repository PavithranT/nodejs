const express = require('express')
const router = express.Router();
const auth = require('../auth').extractToken;
const blackListToken = require('../../database/db').blackListToken

router.get('/', auth, async (req, res) => {
    const token = { token: req.token }
    // res.status(200).json({ message: "manomitra", token: token, size: token.length })
    try {

        await blackListToken.create(token)
            .then(obj => res.json({ message: "Sign out successfull", obj }))
            .catch(err => res.json(err))

    } catch (error) {
        console.log(" sing up page error ", error)
        res.status(error.status).json({ errors: error.message })
    }

})

module.exports = router