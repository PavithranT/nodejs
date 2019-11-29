const ApplicationError = require('./ApplicationError')

class AuthorizationError extends ApplicationError {
    constructor(message) {
        super(message || 'Please login..', 401)
    }
}
module.exports = AuthorizationError