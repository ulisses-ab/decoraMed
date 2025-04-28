const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    host: 'smtp.gmail.com',
    port: 465,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
};