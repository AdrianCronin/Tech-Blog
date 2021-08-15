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



// create a new postroute
router.post("/", async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;