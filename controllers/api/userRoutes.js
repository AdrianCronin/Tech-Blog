const router = require('express').Router();
const { User } = require('../../models');

// login post route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json("Incorrect email or password");
            return;
        }

        if (!userData.password === req.body.password) {
            res.status(400).json("Incorrect email or password");
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({user: userData, message: 'You are now logged in!'});
        });


    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
