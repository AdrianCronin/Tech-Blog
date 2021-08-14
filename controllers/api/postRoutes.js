const { Post, User, Comment } = require('../../models');

const router = require('express').Router();
// const withAuth = require('../../utils/auth');

router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }, Comment]
        });
        const post = postData.get({ plain: true });
        console.log(post);
        res.render('blogPage', { post });

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;