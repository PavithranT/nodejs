const jwt = require('jsonwebtoken')
const config = require('../config')

exports.extractToken = (req, res,next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            console.log('token extracted ',token)
            req.token = token;
            jwt.verify(token, config.tokenDetail.secretKey);
        }else throw 'No Header'
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized " });
    }
    next();
}