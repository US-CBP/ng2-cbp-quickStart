'use strict';

const express = require('express');
const low = require('lowdb');
const path = require('path');
const storage = require('lowdb/lib/file-sync');
const uuid = require('node-uuid');
const loadJsonFile = require('load-json-file');


//=========================================================
//  DATABASE
//---------------------------------------------------------
const db = low(path.join(__dirname, 'db.json'), {storage});

//Load Header Data
loadJsonFile(path.join(__dirname, 'data/headerData.json')).then(json => {
    console.log(json)
    db.set('getHeaderData', json).value();
});



//=========================================================
//  ROUTER
//---------------------------------------------------------
const router = new express.Router();
module.exports = router;


router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin, X-Requested-With');
  next();
});

router.get('/getHeaderData', (req, res) => {
  res.status(200).json(db.get('getHeaderData').value());
});










//=========================================================
//  EXAMPLE
//---------------------------------------------------------
// router.post('/tasks', (req, res) => {
//   let data = req.body;
//   data.id = uuid.v4();
//   let task = db.get('tasks').push(data).last().value();
//   res.status(200).json(task);
// });


// router.get('/tasks', (req, res) => {
//   res.status(200).json(db.get('tasks').value());
// });


// router.get('/tasks/:id', (req, res) => {
//   res.status(200);
// });


// router.put('/tasks/:id', (req, res) => {
//   let id = req.params.id;
//   let task = db.get('tasks').find({id}).assign(req.body).value();
//   res.status(200).json(task);
// });


// router.delete('/tasks/:id', (req, res) => {
//   let id = req.params.id;
//   let task = db.get('tasks').find({id}).value();
//   db.get('tasks').remove({id}).value();
//   res.status(200).json(task);
// });
