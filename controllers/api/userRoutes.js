const router = require('express').Router();
const { User } = require('../../models');

// login route
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

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// logout route
router.post('/logout', (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.logged_in = false;
            res.redirect('/');
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

// create a new user route
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;