var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');
var bodyParser = require('body-parser')



router.get('/', (req, res) => {

    User.find({}).then((result) =>
        res.json(result).sendStatus(200)

    ).catch((err) => {
        res.json(err)

    })


});

router.get('/:uName', function (req, res, next) {
    User.find({ username: req.params.uName }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
        res.json(err)

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
    res.json(result).send(201)

    ).catch((err) => {
        res.send(409)

    })

});


router.delete('/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body).then((result) =>
        res.sendStatus(200)
    ).catch((err) => {
        res.send(409)

    })
});

module.exports = router;