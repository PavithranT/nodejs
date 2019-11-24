const jwt = require('jsonwebtoken')
const config = require('../config')

exports.extractToken = (req, res) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];

            const bearerToken = bearer[1];
            req.token = bearerToken;
            jwt.verify(bearerToken, config.tokenInfo.secreteKey);
        }
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized " });
    }
}