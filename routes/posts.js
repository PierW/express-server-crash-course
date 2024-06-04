import express from 'express';
const router = express.Router();

let posts = [
    {id : 1, name: "Post numero uno"},
    {id : 2, name: "Post numero due"},
    {id : 3, name: "Post numero tre"}
];


// Get all posts
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0, limit));
    } 
    res.status(200).json(posts);
});

// Ottieni singolo post
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id );
    if(!post){
        return res.status(404).json({msg: 'Post non trovato'});
    }
    res.status(200).json(post);

});

// Crea nuovo Post
router.post('/', (req, res) => {

    const newPost = {
        id : posts.length + 1,
        title : req.body.title
    }

    if(!newPost.title){
        return res.status(400).json({msg: 'Titolo assente'});
    }

    posts.push(newPost);
    res.status(201).json(posts);
});

export default router;
