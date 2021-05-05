const express = require('express');
const router = express.Router();

const { User } = require('../models/user.model');

router.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ email: emailId });

        if (user === null) {
            res.json({ success: false, message: 'email or password invalid' });
        }

        if (password === user.password) {
            user.__v = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            user.password = undefined;
            res.json({
                success: true,
                user: user,
                TOKEN: 'A_VERY_SECRET_TOKEN',
            });
        } else {
            res.json({ success: false, message: 'email or password invalid' });
        }
    } catch (error) {
        console.log('error', error);
        res.json({ success: false, message: 'auth failed' });
    }
});

module.exports = router;
