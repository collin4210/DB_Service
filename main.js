var mongoose = require('mongoose');
const express = require('express');
const PORT = process.env.port || 5555;
const api = express();
var user = require('./routes/user');
api.use('/user', user);


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/FDDW', {
    poolSize: 10,
    authSource: "admin",
    user: "ObiWan",
    pass: "HelloThere!",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 

})
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err));

api.listen(PORT, () => {

    console.log("API läuft!", PORT)
  });