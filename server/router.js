'use strict';

const express = require('express');
const low = require('lowdb');
const path = require('path');
const storage = require('lowdb/lib/file-sync');
const loadJsonFile = require('load-json-file');
const _ = require('lodash');

//=========================================================
//  DATABASE
//---------------------------------------------------------
const db = low(path.join(__dirname, 'db.json'), { storage });

// Load Header Data
loadJsonFile(path.join(__dirname, 'data/header-data.json')).then(json => {
    db.set('headerData', json).value();
});

loadJsonFile(path.join(__dirname, 'data/table-data.json')).then(json => {
    db.set('tableData', json).value();
});

loadJsonFile(path.join(__dirname, 'data/tree-node-data.json')).then(json => {
    db.set('treeNodeData', json).value();
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
    res.status(200).json(db.get('headerData').value());
});

router.post('/getTableData', (req, res) => {
    let query = JSON.parse(req.body); /* params --> limit -- offset -- pageCount -- page*/
    let header = _.clone(db.get('tableData').value());

    if(query) {
        let offset = (query.limit * (query.page - 1));
        let data = _.slice(header.data, offset, (offset + query.limit));
        header.data = _.map(data, function(item) {
            let nItem = _.clone(item);
            nItem.name = item.name.last + ', ' + item.name.first;
            return nItem;
        });
    }
    res.status(200).json(header);
});

router.get('/getTreeNodeData', (req, res) => {
    res.status(200).json(db.get('treeNodeData').value());
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
