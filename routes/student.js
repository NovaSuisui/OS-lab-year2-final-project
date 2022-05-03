const express = require('express');
const { render, append } = require('express/lib/response');
const res = require('express/lib/response');
const router = express.Router();
const db = require('../config/database');
const _model_student = require('../models/model_student');
const _model_district = require('../models/model_district');

const Sequelize = require('sequelize');
const { where } = require('sequelize');
const Op = Sequelize.Op;

//get table
router.get('/', (req, res) => 
    _model_student.findAll({
        include: {
            model: _model_district,
            //where: { DistrictCode: { [Op.like]: _model_student.SetDistrictDistrictCode } }
        }
    })
    .then(model => {
        /*console.log(model);
        res.sendStatus(200);*/
        res.render('studentData_view', {
            model
        })
    })
    .catch(err => console.log('Error : '+err))
);

//add table
router.get('/add', (req, res) => res.render('add'));

//post table
router.post('/add', (req, res) => {
    // const data = {
    //     StudentID: '0001',
    //     FName: 'ghi',
    //     LName: 'jkl',
    //     DistrictCode: '0000',
    // }

    let { StudentID, FName, LName, DistrictCode } = req.body/*data*/;
    let errors = [];

    //validate fields
    if (!StudentID) {
        errors.push({ text: 'Please add your student ID' });
    }
    if (!FName) {
        errors.push({ text: 'Please add your first name' });
    }
    if (!LName) {
        errors.push({ text: 'Please add your Last name' });
    }

    //Check for errors
    if(errors.length > 0){
        res.render('add', {
            errors,
            StudentID,
            FName,
            LName,
            DistrictCode
        });
    }
    else{
        errors.push({ text: 'primary' });

        //INSERT
        _model_student.create({
            StudentID,
            FName,
            LName,
            DistrictCode
        })
    
        .then(temp => res.redirect('/studentData'))
        .catch(err => res.render('add',{
            errors,
            StudentID,
            FName,
            LName,
            DistrictCode}
        /*console.log('Error : '+err)*/));
    }

});

//Search
router.get('/search', (req, res) => {
    const { term } = req.query;
    _model_student.findAll({ where: { StudentID: { [Op.like]: '%' + term + '%' } } })
    .then(model => res.render('studentData_view', { model }))
    .catch(err => console.log(err));
});

module.exports = router;