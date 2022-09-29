const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../utils/utils')

const getAll = async (req, res, next) => {
  console.log('all')
  const result = await mongodb.getDb().db('bookOfMormon').collection('bookMarks').find();
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
    .db('bookOfMormon')
    .collection('bookMarks')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createBookmark = async (req, res) => {
  console.log('adding new bookmark')
  console.log('Body '+req.body)
  const bookmark = {
    title:req.body.title,
    note:req.body.note,
    book:req.body.book,
    currentBook:req.body.currentBook,
    currentChapter:req.body.currentChapter,
    progressPercent:req.body.progressPercent,
    createdIn:utils.formatDate(),
    lastRead:''
  };
 
  const response = await mongodb.getDb().db('bookOfMormon').collection('bookMarks').insertOne(bookmark);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the bookmark.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createBookmark

};
/*
const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db('personalAssignment')
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  console.log(userId)
  const response = await mongodb.getDb().db('personalAssignment').collection('contacts').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};

*/