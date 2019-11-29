const express = require('express')
const router = express.Router();
const User = require('../../database/db').users;
const BadRequestError = require('../errors/BadRequestError')
const ItemAlreadyExist = require('../errors/ItemAlreadyExist')
const { check, validationResult } = require('express-validator');

router.post('/', async (req, res) => {
    let reqData = req.body
    let isNull;
    await check('username').isString().withMessage("Should be String").isLength({ min: 5 }).run(req);
    await check('passcode').isLength({ min: 5 }).withMessage("Password should be min 5 letters").run(req);
    await check('name').isString().withMessage("Should be String").isLength({ min: 3 }).withMessage("Name should be min 3 letters").run(req);
    try {

        if (!validationResult(req).isEmpty()) throw new BadRequestError(validationResult(req).errors);

        isNull = await User.findOne(
            { where: { username: reqData.username } }
        )
        if (isNull !== null) throw new ItemAlreadyExist('User already exits.');

        await User.create(reqData)
            .then(obj => res.json({ message: "Sign up successfull", obj }))
            .catch(err => res.json(err))

    } catch (error) {
        res.status(error.status).json({ errors: error.message })
    }

})

module.exports = router