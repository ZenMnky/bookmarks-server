const express = require('express');
const logger = require('../logger');
const { v4: uuid } = require('uuid');
const { bookmarks } = require('../store');
const bookmarksRouter = express.Router();

bookmarksRouter
    .route('/bookmarks')
    .get( (req, res) => {
        res.json(bookmarks)
    })
    .post((req, res) => {
        // code here
    })

bookmarksRouter 
    .route('/bookmarks/:id')
    .get((req, res) => {
        // code here
    })
    .delete((req, res) => {
        // code here
    })

module.exports = bookmarksRouter;