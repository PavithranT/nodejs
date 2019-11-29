module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        'Users', {
        name: { type: Sequelize.STRING, allowNull: false },
        username: { type: Sequelize.STRING, primaryKey: true },
        passcode: { type: Sequelize.STRING, allowNull: false },
        isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
    });

    User.sync().catch(err => console.log('error while creating user table. ', err))

    // exports.module = (sequelize, User)
    return User;
}