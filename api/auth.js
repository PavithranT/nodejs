const jwt = require('jsonwebtoken')
const config = require('../config')
const AuthorizationError = require('../api/errors/AuthorizationError')
const blackListToken = require('../database/db').blackListToken

exports.extractToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            req.token = token;
            if (await blackListToken.findOne({ where: { token: token } })) { throw new AuthorizationError }
            // jwt.verify(token, config.tokenDetail.secretKey)
        } else throw new AuthorizationError()
    } catch (err) {
        let error = new AuthorizationError()
        res.status(error.status).json({ message: error.message });
    }
    next();
}