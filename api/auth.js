const jwt = require('jsonwebtoken')
const config = require('../config')
const AuthorizationError = require('../api/errors/AuthorizationError')

exports.extractToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            req.token = token;
            jwt.verify(token, config.tokenDetail.secretKey)
        } else throw new AuthorizationError()
    } catch (err) {
        res.status(AuthorizationError.status).json({ message: err.message });
    }
    console.log("came here")
    next();
}