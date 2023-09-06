var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://fddwvs07.gm.fh-koeln.de:27017";
const express = require('express');
const PORT = process.env.port || 6969;
const api = express();

api.listen(PORT, () => {
    console.log("API läuft!")
});

//alle User ausgeben
api.get('/user', (req,res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FDDW");
        dbo.collection("user").find({}, function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });

      res.status(200).send(result)

});


//einen User ausgeben
api.get('/user/:uName', (req,res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FDDW");
        dbo.collection("user").find({username : req.params.uName}, function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });
      res.status(200).send(result)
});

//einen User löschen
api.delete('/user/:uName', (req,res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FDDW");
        dbo.collection("user").deleteOne({username : req.params.uName}, function(err, obj) {
          if (err) throw err;
          console.log("One entry deleted");
          db.close();
        });
      });
      res.status(200).send("User deleted")

});

//einen User hinzufügen
 api.post('/user', (req,res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("FDDW");
    var myobj = {
      username: req.body.username,
      vorname: req.body.vorname,
      nachname: req.body.nachname, 
      plz: req.body.plz,
      stadt: req.body.stadt,
      strasse: req.body.strasse,
      hnr: req.body.hnr,
      werkzeug: []
      
    };
    dbo.collection("user").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 user created");
      db.close();
    });
  });
  res.status(201);
});

//einen User bearbeiten
api.put('/user/:uID', (req,res) => {
    // TODO

});


//ein Werkzeug hinzufügen
api.post('/user/:uName/tool', (req,res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("FDDW");
    var myquery = { username: req.params.uName };
    var newvalues = { $push: {werkzeug : {
      bezeichnung: req.body.bezeichnung,
      beschreibung: req.body.beschreibung,
      ausgeliehen: false
    }} };
    dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  res.status(201);

});

//alle Werkzeuge ausgeben
api.get('/tool', (req,res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FDDW");
        dbo.collection("user").find({},{username: 0, vorname: 0, nachname: 0, plz:0, stadt: 0, strasse: 0,hnr: 0, werkzeug: 1}, function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });
      res.status(200).send(result)

});

/*

//ein Werkzeug ausgeben
api.get('/tool/:tID', (req,res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FDDW");
        dbo.collection("Werkzeug").find({WerkzeugID : req.params.tID}, function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });
      res.status(200).send(result)

});



//ein Werkzeug löschen
api.delete('/tool/:tID', (req,res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("FDDW");
        dbo.collection("user").deleteOne({WerkzeugID : req.params.tID}, function(err, obj) {
          if (err) throw err;
          console.log("One entry deleted");
          db.close();
        });
      });
      res.status(200).send("User deleted")

});



//alle werkzeuge von einem User ausgeben
api.get('/user/:uID/tools', (req,res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("FDDW");
    dbo.collection("Werkzeug").find({UserID : req.params.uID}, function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
  res.status(200).send(result)


});

*/
