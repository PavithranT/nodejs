const Sequelize = require('sequelize')
const DatabaseError = require('../api/errors/DatabaseError')
const dbData = require('../config').databaseDetails
const db = {}
const sequelize = new Sequelize(dbData.database, dbData.username, dbData.password, {
    host: dbData.host,
    dialect: dbData.dialect,
    pool: {
        max: dbData.maxConnection,
        min: dbData.minConnection,
        acquire: dbData.acquireTime,
        idle: dbData.idleTime
    }
})




//db connection test
sequelize.authenticate()
    .then(() => console.log("DB connected"))
    .catch(() => console.log("DB not connected "))


global.sequelize = sequelize;
global.Sequelize = Sequelize;

db.blackListToken = require('../api/model/blackListToken')(sequelize, Sequelize)
db.users = require('../api/model/user')(sequelize, Sequelize)
db.productCategory = require('../api/model/productCategory')(sequelize, Sequelize)
db.product = require('../api/model/product')(sequelize, Sequelize)
db.product.belongsTo(db.productCategory, { foreignKey: 'productCategoryId' });
db.productCategory.hasOne(db.product, { foreignKey: 'productCategoryId' })

module.exports = db;
