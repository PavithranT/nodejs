const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../../config')
const Users = require('../../database/db').users
const { check, validationResult } = require('express-validator');

//import errors
const UserNotFoundError = require('../errors/UserNotFoundError')
const AuthorizationError = require('../errors/AuthorizationError')
const BadRequestError = require('../errors/BadRequestError')

router.post('/', async (req, res, next) => {

    await check('passcode').isLength({ min: 5 }).run(req);
    await check('username').isLength({ min: 5 }).run(req);

    let login = req.body;
    let token = null;
    try {
        if (!validationResult(req).isEmpty()) throw new BadRequestError(validationResult(req).errors);

        //get user's passcode
        const user = await Users.findOne({
            where: { username: login.username },
            attributes: ['passcode'],
        })

        //validation
        if (user) {
            if (login.passcode === user.passcode) {
                //verify token
                token = jwt.sign(login, config.tokenDetail.secretKey, { expiresIn: config.tokenDetail.expiresIn })
            } else
                throw new AuthorizationError()
        }
        else
            throw new UserNotFoundError()

        //response 
        res
            .status(200)
            .json({
                token: token,
                message: 'Login Success',
            }
            )
    } catch (err) {
        res.status(err.status).json({ message: err.message })
        next(err);
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await Users.findAll({ attributes: ['username', 'passcode'] })
        res.status(200).send(users)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;