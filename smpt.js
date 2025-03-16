const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    host: 'smtp.mailersend.net',
    port: 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
};