const express = requir('express');
const logger = require('../logger');
const { v4: uuid } = require('uuid');

bookmarkRouter
    .route('/bookmarks')
    .get( (req, res) => {
        // code here
    })
    .post((req, res) => {
        // code here
    })

bookmarkRouter 
    .route('/bookmarks/:id')
    .get((req, res) => {
        // code here
    })
    .delete((req, res) => {
        // code here
    })

module.exports = bookmarksRouter;