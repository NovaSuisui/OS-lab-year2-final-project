const Sequelize = require('sequelize');
const db = require('../config/database');

const model_student = db.define('setStudent', {
    StudentID: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    FName: {
        type: Sequelize.STRING
    },
    LName: {
        type: Sequelize.STRING
    },
    /*DistrictCode: {
        type: Sequelize.STRING
    },*/
})

const model_district = db.define('setDistrict', {
    DistrictCode: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    DistrictName: {
        type: Sequelize.STRING
    },
})

model_district.hasMany(model_student);
model_student.belongsTo(model_district);

module.exports = model_student;
//module.exports = model_district;