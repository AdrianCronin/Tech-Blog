const { User, Post, Comment } = require('../models');

const router = require('express').Router();

// homepage route displays posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    };
});

// login route
router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard'); //change to dashboard once set up
            return;
        }
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    };
});

// signup route
router.get('/signup', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard'); //change to dashboard once set up
            return;
        }
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    };
});

// logout route
router.get('/logout', async (req, res) => {
    try {
        res.redirect('/');
    } catch (err) {
        res.status(500).json(err);
    };
});

// dashboard page route
router.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        const postData = await Post.findAll({
            where:
            {
                id: req.session.user_id
            },
            include:
                [{
                    model: User,
                    attributes: ['username']
                }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        req.session.dashboard = true;
        res.render('dashboard', { posts, logged_in: req.session.logged_in, dashboard: req.session.dashboard });

    } catch (err) {
        res.status(500).json(err);
    }
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
