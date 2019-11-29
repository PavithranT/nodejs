module.exports = (sequelize, Sequelize) => {
    const ProductCategory = sequelize.define(
        'Product_Category', {
        productCategoryId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false },
        isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
    });

    ProductCategory.sync().catch(err => console.log('error while creating user table. ', err))

    // exports.module = (sequelize, User)
 
    // ProductCategory.query.byProductCategoryId = function(productCategoryId) { return this.find({ productCategoryId: productCategoryId }) };
    return ProductCategory;
}
