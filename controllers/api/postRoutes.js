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
        console.log(post);

        const commentData = await Comment.findAll({
            where: { post_id: post.id },
            include: [{ model: User, attributes: ['username'] }]
        });
        const comments = commentData.map((comment) => comment.get({plain: true}));

        console.log(comments);
        res.render('blogPage', { post, comments });

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;