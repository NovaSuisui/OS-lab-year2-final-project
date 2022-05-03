const Sequelize = require('sequelize');
const db = require('../config/database');

const model_district = db.define('setDistrict', {
    DistrictCode: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    DistrictName: {
        type: Sequelize.STRING
    },
})

module.exports = model_district;