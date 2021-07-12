const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

async function authVerify(req, res, next) {
    try {
        const token = req.headers.authorization;
        const decode = jwt.verify(token, process.env.SECRET);
        const userId = decode._id;
        const user = await User.findById(userId);

        if (!user) {
            res.json(401).json({
                success: false,
                errorMessage: 'authenication failed',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            errorMessage: 'authenication failed',
        });
    }
}

module.exports = authVerify;
