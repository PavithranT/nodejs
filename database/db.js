const Sequelize = require('sequelize')
const DatabaseError = require('../api/errors/DatabaseError')
const db = {}
const sequelize = new Sequelize('db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})



//db connection test
sequelize.authenticate()
    .then(() => console.log("DB connected"))
    .catch(() => console.log("DB not connected ") )


global.sequelize = sequelize;
global.Sequelize = Sequelize;


db.users = require('../api/model/user')(sequelize, Sequelize)
db.productCategory = require('../api/model/productCategory')(sequelize, Sequelize)
db.product = require('../api/model/product')(sequelize, Sequelize)
db.product.belongsTo(db.productCategory, { foreignKey: 'productCategoryId' });
db.productCategory.hasOne(db.product, { foreignKey: 'productCategoryId' })

module.exports = db;
