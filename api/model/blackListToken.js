module.exports = (sequelize, Sequelize) => {
    const blackListToken = sequelize.define(
        'blackListToken', {
        token: { type: Sequelize.STRING, allowNull: false }
    });

    blackListToken.sync().catch(err => console.log('error while creating user table. ', err))

    return blackListToken;
}
