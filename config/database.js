const Sequelize = require('sequelize');
module.exports = new Sequelize('os year2/2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    },
});