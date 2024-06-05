import express from 'express';
import {getPosts, getPost, createPost, deletePost, updatePost} from '../controllers/postController.js'
const router = express.Router();


// Middleware Route Level
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} ROUTE LEVEL`);
    next();
}

// Get all posts
router.get('/', logger, getPosts);

// Ottieni singolo post
router.get('/:id', getPost);

// Crea nuovo Post
router.post('/', createPost);

// Update Post
router.put('/:id', updatePost);

// Delete Post
router.delete('/:id', deletePost);
export default router;
