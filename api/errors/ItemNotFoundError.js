const ApplicationError = require('./ApplicationError')

class ItemNotFoundError extends ApplicationError {
    constructor(message) {
        super(message || 'Item not found', 404)
    }
}
module.exports = ItemNotFoundError
