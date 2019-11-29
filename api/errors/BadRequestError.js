const ApplicationError = require('./ApplicationError')

class BadRequest extends ApplicationError {
    constructor(message) {
        super(message || 'Please provide valid data', 400)
    }
}
module.exports = BadRequest