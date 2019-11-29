const ApplicationError = require('./ApplicationError')

class ItemAlreadyExist extends ApplicationError {
    constructor(message) {
        super(message || 'Item already exist.', 409)
    }
}
module.exports = ItemAlreadyExist
