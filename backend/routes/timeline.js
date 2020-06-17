const assert = require('assert');
const { MongoClient } = require('mongodb');
const url = 'mongodb://mongodb:27017';
const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true};
const client = new MongoClient(url, dbOptions);

/**
 * Returns an array of languages matching certain criteria.
 *
 * @param      {Db}      db      The database
 * @param      {Object}  query   The query
 * @return     {Array}   An array of languages.
 */
function findLangs(db, query) {

  // declare case-insensitive tags filter:
  const topic_regex = new RegExp('^' + query.topic + '$', 'i');
  const topic = query.topic ? {tags: topic_regex} : {};

  // filter the main collection, and return it:
  return db.collection('languages')
    .find(topic)
    .toArray();
}

/**
 * Gets an array with all tags present in the database.
 *
 * @param      {Db}     db      The database
 * @return     {Array}  An array of tags.
 */
function getTags(db) {
  return db.collection('languages')
    .aggregate()
    .unwind('$tags')
    .group({_id: null, tagSet: {$addToSet: '$tags'}})
    .toArray()
    .then(arr => arr[0].tagSet);
}

const express = require('express');
const router = express.Router();

// handle connections:
client.connect(function(err) {

  // get a timeline filtered with certain criteria:
  router.get('/', function(req, res, next) {
    assert.equal(null, err);
    const db = client.db('test');
    const send = languages => res.json(languages);
    findLangs(db, req.query).then(send);
  });

  // get all possible tags:
  router.get('/tags', function(req, res, next) {
    assert.equal(null, err);
    const db = client.db('test');
    const send = tagList => res.json(tagList);
    getTags(db).then(send);
  });
}, () => client.close());

module.exports = router;
