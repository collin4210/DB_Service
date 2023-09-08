var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');


//Aus irgendeinem Grund geht das nur so, frag nicht danke!
async function getUsers(searchFunc) {
    const Users = await searchFunc;
    return Users;

}



router.get('/', (req, res) => {

    User.find({}).then((result) =>
        res.json(result)

    ).catch((err) => {
        res.json(err)

    })


});

router.get('/:uName', function (req, res, next) {
    User.find({ username: req.params.uName }).then((result) =>
        res.json(result)

    ).catch((err) => {
        res.json(err)

    })

});

router.post('/', function (req, res, next) {
    User.create(req.body).then((result) =>
        res.json(result)

    ).catch((err) => {
        res.json(err)

    })

});


router.delete('/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;