import express from 'express';
const router = express.Router();

let posts = [
    {id : 1, title: "Post numero uno"},
    {id : 2, title: "Post numero due"},
    {id : 3, title: "Post numero tre"}
];

// Middleware Route Level
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} ROUTE LEVEL`);
    next();
}

// Get all posts
router.get('/', logger, (req, res, next) => {
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0, limit));
    } 
    res.status(200).json(posts);
});

// Ottieni singolo post
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id );
    if(!post){
        const error = new Error('Post non trovato');
        error.status = 404;
        return next(error);
    }
    res.status(200).json(post);

});

// Crea nuovo Post
router.post('/', (req, res, next) => {

    const newPost = {
        id : posts.length + 1,
        title : req.body.title
    }

    if(!newPost.title){
        const error = new Error('Titolo assente');
        error.status = 400;
        return next(error);
    }

    posts.push(newPost);
    res.status(201).json(posts);
});

// Update Post
router.put('/:id', (req, res, next) => {

    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id );

    if(!post){
        const error = new Error('Post non trovato');
        error.status = 404;
        return next(error);
    }

    if(!req.body.title){
        const error = new Error('Titolo assente');
        error.status = 400;
        return next(error);
    }

    post.title = req.body.title;
    res.status(200).json({msg: 'Post aggiornato'})
});

// Delete Post
router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id );

    if(!post){
        const error = new Error('Post non trovato');
        error.status = 404;
        return next(error);
    }

    posts = posts.filter((post) => post.id !== id );
    res.status(200).json({msg: 'Post Eliminato'}) 
});
export default router;
