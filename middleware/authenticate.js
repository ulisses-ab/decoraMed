const jwt = require('jsonwebtoken');
const User = require('../schema/User');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        const error = new Error('No token provided or invalid token format');
        error.status = 401;
        throw error;
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-hashedPassword');
        
        if(!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            error.message = 'Invalid token';
            error.status = 401;
        }
        throw error;
    }
});

module.exports = authenticate;