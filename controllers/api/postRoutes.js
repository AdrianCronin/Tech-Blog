const { Post, User, Comment } = require('../../models');

const router = require('express').Router();
// const withAuth = require('../../utils/auth');

// get a post and its comments
router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }]
        });
        const post = postData.get({ plain: true });

        // get all comments for the post
        const commentData = await Comment.findAll({
            where: { post_id: post.id },
            include: [{ model: User, attributes: ['username'] }]
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('blogPage', { post, comments, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new post route
router.post("/new", async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// edit post page
router.get('/edit/:id', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/');
            return;
        }

        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });

        req.session.dashboard = true;
        res.render('editPost', { post, logged_in: req.session.logged_in, dashboard: req.session.dashboard, post_id: req.params.id });
    } catch (err) {
        res.status(500).json(err);
    };
});

// edit a post route
router.put("/edit/:id", async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a post route
router.delete("/delete/:id", async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new comment route
router.post("/comment", async (req, res) => {
    try {
        const comment = await Comment.create({
            post_id: req.body.post_id,
            content: req.body.comment,
            user_id: req.session.user_id
        });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;