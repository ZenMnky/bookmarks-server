const express = require('express');
const logger = require('../logger');
const { v4: uuid } = require('uuid');
const { bookmarks } = require('../store');
const { port } = require('../config');
const bookmarksRouter = express.Router();

bookmarksRouter
    .route('/bookmarks')
    .get( (req, res) => {
        res.json(bookmarks)
    })
    .post((req, res) => {
        // destructure
        const { title, url, description, rating } = req.body;
        // validate
        // rating is not required
        if(!title){
            logger.error('Title is required');
            return res
                .status(400)
                .send('Invalid data - title is required')
        }
        
        if(!url){
            logger.error('URL is required');
            return res
                .status(400)
                .send('Invalid data - url is required')
        }
        if(!description){
            logger.error('Description is required');
            return res
                .status(400)
                .send('Invalid data - description is required')
        }
        // if rating exists, it must only be a number between 1 and 5
        if(rating){
            let num = parseInt(rating, 10);
            if( isNaN(num) || num > 5 || num < 1){
                logger.error('Rating may only be between 1 and 5');
                return res
                    .status(400)
                    .send('Invalid data - Rating may only be between 1 and 5')
            }
        }

        // act
        const id = uuid();
        const bookmark = {
            id,
            title,
            url,
            description,
            rating
        };

        bookmarks.push(bookmark);

        // log respond
        logger.info(`Bookmark with id ${id} created`)
        res
            .status(201)
            .location(`http://localhost:${port}/bookmarks/${id}`)
            .json(bookmark)        

    })

bookmarksRouter 
    .route('/bookmarks/:id')
    .get((req, res) => {
        // destructure
        const { id } = req.params;
        
        // find
        const bookmark = bookmarks.find(bm => bm.id == id);

        // validate
        if(!bookmark){
            logger.error(`Bookmark with id ${id} not found`)
            return res
                .status(404)
                .send('404 Not Found')
        }

        // respond
        return res.json(bookmark)
    })
    .delete((req, res) => {
        // code here
    })

module.exports = bookmarksRouter;