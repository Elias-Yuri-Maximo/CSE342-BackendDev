const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  console.log('all')
  const result = await mongodb.getDb().db('personalAssignment').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  console.log('Single')
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('personalAssignment')
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

module.exports = { getAll, getSingle };