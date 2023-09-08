var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tool = require('../models/tool.js');
var bodyParser = require('body-parser')



router.get('/', (req, res) => {

    Tool.find({}).then((result) =>
        res.json(result).sendStatus(200)

    ).catch((err) => {
    

    })


});

router.get('/:bezeichnung', function (req, res, next) {
    Tool.find({ bezeichnung : req.params.bezeichnung }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});

router.get('/:id/ausleihen', function (req, res, next) {
    Tool.findById({ _id: req.params.id }).then((result) => {
        var update = true
            if(result.ausgeliehen == true)    {

                update = false

    }
    result.updateOne({ausgeliehen : update})
    res.json(result).sendStatus(200)

    }).catch((err) => {
 

    })

});

router.put('/:id/status', function (req, res, next) {
    Tool.findById({ _id: req.params.id }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});



router.post('/',bodyParser.json(), function (req, res, next) {
    Tool.create({
        bezeichnug: req.body.bezeichnug,
        ausgeliehen: false,
        OwnerUsername: req.body.Owner

    }).then((result) =>
    res.json(result).sendStatus(201)

    ).catch((err) => {
    

    })

});


router.delete('/:id', function (req, res, next) {
    Tool.findByIdAndRemove(req.params.id).then((result) =>
        res.sendStatus(200)
    ).catch((err) => {
     
    })
});

module.exports = router;