const { User, Post, Comment } = require('../models');

const router = require('express').Router();

// homepage view displays posts
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

// login view
router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        }
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    };
});

// signup view
router.get('/signup', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
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
                user_id: req.session.user_id
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

// create new post page
router.get('/new', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/');
            return;
        }
        req.session.dashboard = true;
        res.render('newPost', { logged_in: req.session.logged_in, dashboard: req.session.dashboard, user_id: req.session.user_id });
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;