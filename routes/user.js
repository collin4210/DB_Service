var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Tool = require('../models/tool.js');
var bodyParser = require('body-parser')



router.get('/', (req, res) => {

    User.find({}).then((result) =>
        res.json(result).sendStatus(200)

    ).catch((err) => {
    

    })


});

router.get('/:uName', function (req, res, next) {
    User.find({ username: req.params.uName }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});

router.get('/:uName/tools', function (req, res, next) {
    Tool.find({ OwnerUsername: req.params.uName }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});

router.get('/:id', function (req, res, next) {
    User.findById({ _id: req.params.id }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});

router.post('/',bodyParser.json(), function (req, res, next) {
    User.create({
        username: req.body.username,
        name: req.body.name,
        nachname: req.body.nachname,
        PLZ: req.body.plz,
        Adresse: req.body.adresse,
        Stadt: req.body.stadt,
        Email: req.body.email

    }).then((result) =>
    res.json(result).sendStatus(201)

    ).catch((err) => {
    

    })

});


router.delete('/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id).then((result) =>
        res.sendStatus(200)
    ).catch((err) => {
     
    })
});

module.exports = router;