const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://user1:1234@localhost:27017/test';
const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true};
const client = new MongoClient(url, dbOptions);

const findTech = function(db, query, callback) {
  const collection = db.collection('techs');
  collection.find(query).toArray(function(err, technologies) {
    assert.equal(err, null);
    callback(technologies);
  });
};

const express = require('express');
const router = express.Router();

client.connect(function(err) {
  router.get('/', function(req, res, next) {
    assert.equal(null, err);
    const db = client.db('test');
    console.log(req.query.topic);
    const query = req.query.topic ? {tags: req.query.topic} : {};
    findTech(db, query, function(technologies) {
      res.json(technologies);
    });
  });
});
// client.close() // ?

module.exports = router;
