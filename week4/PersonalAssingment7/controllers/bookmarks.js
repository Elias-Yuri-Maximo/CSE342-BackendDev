
require('dotenv').config();
const axios = require('axios')
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

//redirect the user to github in order to login.
const login = async(req,res)=> {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
};

async function receive (req, res){
  const code = req.query.code;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  const response = await axios.post('https://github.com/login/oauth/access_token', body, opts)
  console.log(response)
  return res.status(200).end()
}

const loginCallback = async (req, res)=>{
 
//  res.write("Worked")
//  res.end()
const code = req.query.code;
const body = {
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET ,
  code,
};
const opts = { headers: { accept: 'application/json' } };
const response = await axios.post('https://github.com/login/oauth/access_token', body, opts)

return res.status(200).json({token:response.data})

};


async function findContent(req, res){
  const bookName = req.params.id
  try{
    console.log('Single')
    const result = await mongodb
      .getDb()
      .db('bookOfMormon')
      .collection('content')
      .find({ _id: bookName });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }catch(err){
    res.status(500).json(err);
  }

}



module.exports = {
  findContent,
  loginCallback,
  login,
  getAll,
  getSingle,
  createBookmark,
  updateBookmark,
  deleteBookmark
};

