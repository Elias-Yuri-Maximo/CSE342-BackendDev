const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../utils/utils')


const getAll = async (req, res, next) => {
  try{
  console.log('all')
  const result = await mongodb.getDb().db('bookOfMormon').collection('bookMarks').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  }catch(err){
    res.status(500).json(err);
  }
};

const getSingle = async (req, res, next) => {
  try{
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
}catch(err){
  res.status(500).json(err);
}
};

const createBookmark = async (req, res) => {
try{
  if (!utils.checkEmptyFields(req.body)){
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  if (!req.body.book in utils.books){
    res.status(400).send({ message: 'Book non existant!' });
    return;
  }



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
}catch(err){
  res.status(500).json(err);
}
};

const updateBookmark = async (req, res) => {

  try{
  //check if empty fields: 
  //check 
  if (!(utils.checkEmptyFields(req.body))){
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  if (!(utils.books.includes(req.body.currentBook) )){
    res.status(400).send({ message: 'Book non existant!' });
    return;
  }

  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const bookmark = {
    title:req.body.title,
    note:req.body.note,
    book:req.body.book,
    currentBook:req.body.currentBook,
    currentChapter:req.body.currentChapter,
    progressPercent:req.body.progressPercent,
    //createdIn:req.body.createdIn,
    lastRead:utils.formatDate()
  };
  const response = await mongodb
    .getDb()
    .db('bookOfMormon')
    .collection('bookMarks')
    .updateOne({ _id: userId }, {$set: bookmark})
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the bookmark');
  }

}catch(err){
  res.status(500).json(err);
}
};

const deleteBookmark = async (req, res) => {
  try{
  const userId = new ObjectId(req.params.id);
  console.log(userId)
  const response = await mongodb.getDb().db('bookOfMormon').collection('bookMarks').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}catch(err){
  res.status(500).json(err);
}
};

module.exports = {
  getAll,
  getSingle,
  createBookmark,
  updateBookmark,
  deleteBookmark
};

