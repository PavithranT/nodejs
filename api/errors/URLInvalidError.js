const ApplicationError = require('./ApplicationError')

class URLInvalidError extends ApplicationError {
    constructor(message) {
        super(message || 'URL Invalid', 404)
    }
}
module.exports=URLInvalidError