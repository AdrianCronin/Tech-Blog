const { User, Post, Comment } = require('../models');

const router = require('express').Router();

// homepage route displays posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ include: [{ model: User, attributes: ['username'] } ] });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts });

    } catch (err) {
        res.status(500).json(err);
    };
});

// login route
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    };
});

// signup route
router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    };
});




// testing find all users with their posts and comments
router.get('/testUsers', async (req, res) => {
    try {
        const users = await User.findAll({ include: [Post, Comment] });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    };
});

// testing find all posts with their comments
router.get('/testPosts', async (req, res) => {
    try {
        const postData = await Post.findAll({ include: [{ model: User, attributes: ['username'], },], });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    };
});

// testing find all comments with their poster
router.get('/testComments', async (req, res) => {
    try {
        const comments = await Comment.findAll({ include: User });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;
