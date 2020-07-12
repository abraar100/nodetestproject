var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.get('/listMovies', function (req, res) 
{
  
   const MongoClient = require('mongodb').MongoClient;
   const assert = require('assert');
 
   // Connection URL
   const url = 'mongodb://localhost:27017';
 
   // Database Name
   const dbName = 'new_test';
 
   // Use connect method to connect to the server
   MongoClient.connect(url, function(err, client) 
   {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      
      const db = client.db(dbName);
      
      const collection = db.collection('Movies');
   
      collection.find({}).toArray(function(err, docs) 
      {
         assert.equal(err, null);
         res.send(docs);
         client.close();
      });
   });

});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});
