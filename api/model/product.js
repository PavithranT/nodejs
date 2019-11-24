const mongoose = require('mongoose');
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

let productSchema = Schema({
    // _id: Schema.Types.ObjectId,
    productId: { type: Number, ref: 'productIdRef', index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }
});


//custom queries
productSchema.query.byProductId = function(productId) { return this.find({ productId: productId }) };
productSchema.query.byName = function(name) { return this.find({ name: name }) };



//auto increment
autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, {
    model: 'productIdRef',
    field: 'productId',
    startAt: 50,
    incrementBy: 2
});


module.exports = mongoose.model('Product', productSchema);