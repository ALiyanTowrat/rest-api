const express = require('express');
const router = express.Router();
const Student = require('./model/student')
const mongoose = require('mongoose')

router.get('/', (req, res, next) => {
    Student.find()
        .then(result => {
            res.status(200).json({
                studentdata: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        number: req.body.number,
    })

    student.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                newstudent: result
            })
        })

        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:_id', (req, res, next) => {
    console.log(req.params._id)
    Student.findById(req.params._id)
        .then(result => {
            console.log(result);
            res.status(200).json({
                newstudent: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

})



module.exports = router;