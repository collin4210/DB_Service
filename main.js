var mongoose = require('mongoose');
const express = require('express');
const PORT = process.env.port || 5555;
const api = express();
var user = require('./routes/user');
app.use('/user', user);


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/FDDW')
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err));

api.listen(PORT, () => {

    console.log("API läuft!", PORT)
  });