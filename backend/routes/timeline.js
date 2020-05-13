const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://user1:1234@localhost:27017/test';
const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true};
const client = new MongoClient(url, dbOptions);

function findTech(db, query) {
  const collection = db.collection('techs');
  return collection.find(query).toArray();
}

function getTags(db) {
  return db.collection('techs')
    .find({}, {_id: false, tags: true})
    .toArray()
    .then(docs => docs.map(doc => doc.tags))
    .then(tagLists => tagLists.flat())
    .then(tagList => new Set(tagList))
    .then(tags => Array.from(tags));
}

const express = require('express');
const router = express.Router();

client.connect(function(err) {
  router.get('/', function(req, res, next) {
    assert.equal(null, err);
    const db = client.db('test');
    const query = req.query.topic ? {tags: req.query.topic} : {};
    const send = technologies => res.json(technologies);
    findTech(db, query).then(send);
  });
  router.get('/tags', function(req, res, next) {
    assert.equal(null, err);
    const db = client.db('test');
    const send = tagList => res.json(tagList);
    getTags(db).then(send);
  });
});
// client.close() // ?

module.exports = router;
