module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define(
        'Products', {
        productId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false },
        price: { type: Sequelize.INTEGER, allowNull: false },
        type: { type: Sequelize.STRING, allowNull: false },
        productCategoryId: { type: Sequelize.INTEGER, allowNull: false },
        isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
    });

    Products.sync().catch(err => console.log('error while creating user table. ', err))

    // exports.module = (sequelize, User)
    return Products;
}




//--------------------------------------------------- Product Schema in MangoDb----------------------------------------
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema
// const autoIncrement = require('mongoose-auto-increment')

// let productSchema = Schema({
//     // _id: Schema.Types.ObjectId,
//     productId: { type: Number, ref: 'productIdRef', index: true },
//     name: { type: String, required: true },
//     price: { type: Number, required: true }
// });


// //custom queries
// productSchema.query.byProductId = function(productId) { return this.find({ productId: productId }) };
// productSchema.query.byName = function(name) { return this.find({ name: name }) };



// //auto increment
// autoIncrement.initialize(mongoose.connection);
// productSchema.plugin(autoIncrement.plugin, {
//     model: 'productIdRef',
//     field: 'productId',
//     startAt: 50,
//     incrementBy: 2
// });


// module.exports = mongoose.model('Product', productSchema);